const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//Bring in user model
const User = require("../../models/User");

//--------------------------------------------------------
//@request  : GET
//@route    : /api/users/test
//@access   : Public
//@isAdmin  : False
//@desc     : Test the users public route
//--------------------------------------------------------

router.get("/test", (req, res) => {
  res.json({ message: "user works" });
});

//--------------------------------------------------------
//@request  : POST
//@route    : /api/users/register
//@access   : Public
//@isAdmin  : False
//@desc     : This route is used to register a user.
//--------------------------------------------------------

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //First find out if the user exists in the database already.
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "email already exists";
      res.status(400).json(errors);
    } else {
      //Create an avatar from gravatar TODO: Change This.
      const avatar = gravatar.url(req.body.email, {
        s: "200", //Size
        r: "pg", //Rating
        d: "mm" //Default
      });
      //Create a new user from the data provided in the body (Comes from front end form)
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });
      //Use Bcrypt to encrypt the password using Salt.
      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          if (error) {
            throw error;
          }
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(error => console.log(error));
        });
      });
    }
  });
});

//--------------------------------------------------------
//@request  : POST
//@route    : /api/users/login
//@access   : Public
//@isAdmin  : False
//@desc     : This route is used to return a json webtoken and log in.
//--------------------------------------------------------

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find the user by email to see if they are in the database
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "Users email was not found";
      return res.status(404).json(errors);
    }
    //Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //user password matched the one that was in the database
        //create jwt payload
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          isAdmin: user.isAdmin
        };
        //Sign in token, expires in is in seconds
        jwt.sign(
          payload,
          keys.secretKey,
          { expiresIn: 3600 },
          (error, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        //user password DID NOT match the one that was in the database
        errors.password = "Password is incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

//--------------------------------------------------------
//@request  : GET
//@route    : /api/users/current
//@access   : Public
//@isAdmin  : False
//@desc     : This route is used to return the current user.
//--------------------------------------------------------

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);
module.exports = router;
