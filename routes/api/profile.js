const express = require("express");
const router = express.Router();
const monngoose = require("mongoose");
const passport = require("passport");

//load validation
const validateProfileInput = require("../../validation/profile");
const validateInjuryInput = require("../../validation/injury");
const validateBloodPressureInput = require("../../validation/bloodPressure");
const validateBPMInput = require("../../validation/bpm");
const validateFiftyMetreInput = require("../../validation/fiftyMetre");
const validateHundredMetreInput = require("../../validation/hundredMetre");

//Load Profile model
const Profile = require("../../models/Profile");
//Load User model
const User = require("../../models/User");
//--------------------------------------------------------
//@request  : GET
//@route    : /api/profile/test
//@access   : Public
//@desc     : Test the profile public route
//--------------------------------------------------------

router.get("/test", (req, res) => {
  res.json({ message: "profile works" });
});

//--------------------------------------------------------
//@request  : GET
//@route    : /api/profile
//@access   : Private
//@desc     : Get the current users profile.
//--------------------------------------------------------

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar", "isAdmin"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(error => {
        res.status(404).json(error);
      });
  }
);

//--------------------------------------------------------
//@request  : GET
//@route    : /api/profile/all
//@access   : Private
//@desc     : Get the Profile by username
//--------------------------------------------------------

router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["isAdmin"])
      .then(profile => {
        if (profile.user.isAdmin) {
          Profile.find()
            .populate("user", ["name", "avatar", "isAdmin"])
            .then(profile => {
              if (!profile) {
                errors.noprofile = "There are no profiles";
                return res.status(404).json(errors);
              }
              res.json(profile);
            })
            .catch(error => {
              res
                .status(404)
                .json({ profile: "There is no profile for this user" });
            });
        } else {
          res.status(404).json({ error: "You are not an admin" });
        }
      })
      .catch(error => res.status(404).json(error));
  }
);

//--------------------------------------------------------
//@request  : GET
//@route    : /api/profile/username/:username
//@access   : Private
//@desc     : Get the Profile by username
//--------------------------------------------------------

router.get(
  "/username/:username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["isAdmin"])
      .then(profile => {
        if (profile.user.isAdmin) {
          Profile.findOne({ username: req.params.username })
            .populate("user", ["name", "avatar"])
            .then(profile => {
              if (!profile) {
                errors.noprofile = "There is no profile for this user";
                res.status(404).json(errors);
              }
              res.json(profile);
            })
            .catch(error => {
              res
                .status(404)
                .json({ profile: "There is no profile for this user" });
            });
        } else {
          res.status(404).json({ error: "You are not an admin" });
        }
      })
      .catch(error => res.status(404).json(error));
  }
);

//--------------------------------------------------------
//@request  : GET
//@route    : /api/profile/user/:user_id
//@access   : Private
//@desc     : Get the Profile by user ID
//--------------------------------------------------------
router.get(
  "/user/:user_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["isAdmin"])
      .then(profile => {
        if (profile.user.isAdmin) {
          Profile.findOne({ user: req.params.user_id })
            .populate("user", ["name", "avatar"])
            .then(profile => {
              if (!profile) {
                errors.noprofile = "There is no profile for this user";
                res.status(404).json(errors);
              }
              res.json(profile);
            })
            .catch(error => {
              res
                .status(404)
                .json({ profile: "There is no profile for this user" });
            });
        } else {
          res.status(404).json({ error: "You are not an admin" });
        }
      })
      .catch(error => res.status(404).json(error));
  }
);

//--------------------------------------------------------
//@request  : POST
//@route    : /api/profile
//@access   : Private
//@desc     : Create or edit the users profile
//--------------------------------------------------------

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    //Check validation
    if (!isValid) {
      //return the errors with a 400 status
      res.status(400).json(errors);
    }
    //get all the fields that come in from req.body
    const profileFields = {};
    profileFields.user = req.user.id;

    if (req.body.username) profileFields.username = req.body.username;
    if (req.body.dateOfBirth) profileFields.dateOfBirth = req.body.dateOfBirth;
    if (req.body.age) profileFields.age = req.body.age;
    if (req.body.gender) profileFields.gender = req.body.gender;
    if (req.body.contactNumber)
      profileFields.contactNumber = req.body.contactNumber;
    if (req.body.streetAddress)
      profileFields.streetAddress = req.body.streetAddress;
    if (req.body.postcode) profileFields.postcode = req.body.postcode;
    if (req.body.city) profileFields.city = req.body.city;
    if (req.body.GDPR) profileFields.GDPR = req.body.GDPR;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Profile already exists for the user so update this profile.
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //Profile does not exist for the user so create a new profile.
        Profile.findOne({ username: profileFields.username }).then(profile => {
          if (profile) {
            errors.username = "That username already exists";
            res.status(400).json(errors);
          }
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

//--------------------------------------------------------
//@request  : POST
//@route    : /api/profile/injuries/:username
//@access   : Private
//@desc     : Add injury to current list
//--------------------------------------------------------

router.post(
  "/injuries/:username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Initialize the validation
    const { errors, isValid } = validateInjuryInput(req.body);

    //Check validation
    if (!isValid) {
      //return the errors with a 400 status
      res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .populate("user", ["isAdmin"])
      .then(profile => {
        if (profile.user.isAdmin) {
          Profile.findOne({ username: req.params.username }).then(profile => {
            //Create newInjury object that gets information from the injury form.
            const newInjury = {
              injuryLocation: req.body.injuryLocation,
              injuryDescription: req.body.injuryDescription,
              returnIn: req.body.returnIn,
              current: req.body.current,
              injuryDate: req.body.injuryDate
            };

            //Add new injury to the injury array
            profile.injuries.unshift(newInjury);

            //Save new injury to the profile.
            profile.save().then(profile => {
              res.json(profile);
            });
          });
        }
      })
      .catch(error => res.status(404).json(error));
  }
);

//--------------------------------------------------------
//@request  : POST
//@route    : /api/profile/bloodpressure/:username
//@access   : Private
//@desc     : Add bloodPressure to current list
//--------------------------------------------------------

router.post(
  "/bloodpressure/:username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Initialize the validation
    const { errors, isValid } = validateBloodPressureInput(req.body);

    //Check validation
    if (!isValid) {
      //return the errors with a 400 status
      res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .populate("user", ["isAdmin"])
      .then(profile => {
        if (profile.user.isAdmin) {
          Profile.findOne({ username: req.params.username }).then(profile => {
            //Create newInjury object that gets information from the injury form.
            const newBloodPressure = {
              bloodPressureReading: req.body.bloodPressureReading,
              bloodPressureDate: req.body.bloodPressureDate,
              current: req.body.current
            };

            //Add new injury to the injury array
            profile.bloodPressure.unshift(newBloodPressure);

            //Save new injury to the profile.
            profile.save().then(profile => {
              res.json(profile);
            });
          });
        }
      })
      .catch(error => res.status(404).json(error));
  }
);

//--------------------------------------------------------
//@request  : POST
//@route    : /api/profile/bpm/:username
//@access   : Private
//@desc     : Add BPM to current list
//--------------------------------------------------------

router.post(
  "/bpm/:username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Initialize the validation
    const { errors, isValid } = validateBPMInput(req.body);
    //Check validation
    if (!isValid) {
      //return the errors with a 400 status
      res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .populate("user", ["isAdmin"])
      .then(profile => {
        if (profile.user.isAdmin) {
          Profile.findOne({ username: req.params.username }).then(profile => {
            //Create newInjury object that gets information from the injury form.
            const newBPM = {
              BPMReading: req.body.BPMReading
            };
            //Add new injury to the injury array
            profile.BPM.unshift(newBPM);
            //Save new injury to the profile.
            profile.save().then(profile => {
              res.json(profile);
            });
          });
        }
      })
      .catch(error => res.status(404).json(error));
  }
);

//--------------------------------------------------------
//@request  : DELETE
//@route    : /api/profile/injuries/:injury_id
//@access   : Private
//@desc     : delete injury from the list
//--------------------------------------------------------

router.delete(
  "/injuries/:injury_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({
      injuries: { $elemMatch: { _id: req.params.injury_id } }
    })
      .then(profile => {
        //get remove index.
        const removeIndex = profile.injuries
          .map(item => item.id)
          .indexOf(req.params.injury_id);

        //Splice out of array
        profile.injuries.splice(removeIndex, 1);

        //save
        profile.save().then(profile => res.json(profile));
      })
      .catch(error => {
        res.status(404).json(error);
      });
  }
);

//--------------------------------------------------------
//@request  : DELETE
//@route    : /api/profile/bloodpressure/:bloodpressure_id
//@access   : Private
//@desc     : delete blood pressure from the list
//--------------------------------------------------------

router.delete(
  "/bloodpressure/:bloodpressure_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({
      bloodPressure: { $elemMatch: { _id: req.params.bloodpressure_id } }
    })
      .then(profile => {
        //get remove index.
        const removeIndex = profile.bloodPressure
          .map(item => item.id)
          .indexOf(req.params.bloodpressure_id);

        //Splice out of array
        profile.bloodPressure.splice(removeIndex, 1);

        //save
        profile.save().then(profile => res.json(profile));
      })
      .catch(error => {
        res.status(404).json(error);
      });
  }
);

//--------------------------------------------------------
//@request  : DELETE
//@route    : /api/profile/bpm/:bpm_id
//@access   : Private
//@desc     : delete BPM from the list
//--------------------------------------------------------

router.delete(
  "/bpm/:bpm_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({
      BPM: { $elemMatch: { _id: req.params.bpm_id } }
    })
      .then(profile => {
        //get remove index.
        const removeIndex = profile.BPM.map(item => item.id).indexOf(
          req.params.bpm_id
        );

        //Splice out of array
        profile.BPM.splice(removeIndex, 1);

        //save
        profile.save().then(profile => res.json(profile));
      })
      .catch(error => {
        res.status(404).json(error);
      });
  }
);

//--------------------------------------------------------
//@request  : DELETE
//@route    : /api/profile/
//@access   : Private
//@desc     : delete user profile (Only an admin can delete user)
//--------------------------------------------------------

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

// _____            _____ ______       _____   ____   _____ _______
// |  __ \     /\   / ____|  ____|     |  __ \ / __ \ / ____|__   __|
// | |__) |   /  \ | |    | |__        | |__) | |  | | (___    | |
// |  _  /   / /\ \| |    |  __|       |  ___/| |  | |\___ \   | |
// | | \ \  / ____ \ |____| |____      | |    | |__| |____) |  | |
// |_|  \_\/_/    \_\_____|______|     |_|     \____/|_____/   |_|

//--------------------------------------------------------
//@request  : POST
//@route    : /api/profile/fiftyMetre/:username
//@access   : Private
//@desc     : Add BPM to current list
//--------------------------------------------------------

router.post(
  "/fiftymetre/:username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Initialize the validation
    const { errors, isValid } = validateFiftyMetreInput(req.body);

    //Check validation
    if (!isValid) {
      //return the errors with a 400 status
      res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .populate("user", ["isAdmin"])
      .then(profile => {
        if (profile.user.isAdmin) {
          Profile.findOne({ username: req.params.username }).then(profile => {
            //Create newInjury object that gets information from the injury form.
            const newFiftyMetre = {
              eventType: req.body.eventType,
              lapTime: req.body.lapTime,
              firstSplit: req.body.firstSplit,
              firstVelocity: req.body.firstVelocity,
              firstSR: req.body.firstSR,
              firstDPS: req.body.firstDPS,
              firstCount: req.body.firstCount,
              secondSplit: req.body.secondSplit,
              secondVelocity: req.body.secondVelocity,
              secondSR: req.body.secondSR,
              secondDPS: req.body.secondDPS,
              secondCount: req.body.secondCount,
              avgVelocity: req.body.avgVelocity,
              avgSR: req.body.avgSR,
              avgDPS: req.body.avgDPS
            };

            //Add new injury to the injury array
            profile.fiftyMetre.unshift(newFiftyMetre);

            //Save new injury to the profile.
            profile.save().then(profile => {
              res.json(profile);
            });
          });
        }
      })
      .catch(error => {
        res.status(404).json(error);
      });
  }
);

//--------------------------------------------------------
//@request  : POST
//@route    : /api/profile/hundredMetre/:username
//@access   : Private
//@desc     : Add hundredMetre race to current list
//--------------------------------------------------------

router.post(
  "/hundredmetre/:username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Initialize the validation
    const { errors, isValid } = validateHundredMetreInput(req.body);

    //Check validation
    if (!isValid) {
      //return the errors with a 400 status
      res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .populate("user", ["isAdmin"])
      .then(profile => {
        if (profile.user.isAdmin) {
          Profile.findOne({ username: req.params.username }).then(profile => {
            //Create newInjury object that gets information from the injury form.
            const newHundredMetre = {
              eventType: req.body.eventType,
              lapTime: req.body.lapTime,
              firstSplit: req.body.firstSplit,
              firstVelocity: req.body.firstVelocity,
              firstSR: req.body.firstSR,
              firstDPS: req.body.firstDPS,
              firstCount: req.body.firstCount,
              secondSplit: req.body.secondSplit,
              secondVelocity: req.body.secondVelocity,
              secondSR: req.body.secondSR,
              secondDPS: req.body.secondDPS,
              secondCount: req.body.secondCount,
              thirdSplit: req.body.thirdSplit,
              thirdVelocity: req.body.thirdVelocity,
              thirdSR: req.body.thirdSR,
              thirdDPS: req.body.thirdDPS,
              thirdCount: req.body.thirdCount,
              fourthSplit: req.body.fourthSplit,
              fourthVelocity: req.body.fourthVelocity,
              fourthSR: req.body.fourthSR,
              fourthDPS: req.body.fourthDPS,
              fourthCount: req.body.fourthCount,
              avgVelocity: req.body.avgVelocity,
              avgSR: req.body.avgSR,
              avgDPS: req.body.avgDPS
            };

            //Add new injury to the injury array
            profile.hundredMetre.unshift(newHundredMetre);

            //Save new injury to the profile.
            profile.save().then(profile => {
              res.json(profile);
            });
          });
        }
      })
      .catch(error => {
        res.status(404).json(error);
      });
  }
);

// _____            _____ ______       _____  ______ _      ______ _______ ______
// |  __ \     /\   / ____|  ____|     |  __ \|  ____| |    |  ____|__   __|  ____|
// | |__) |   /  \ | |    | |__        | |  | | |__  | |    | |__     | |  | |__
// |  _  /   / /\ \| |    |  __|       | |  | |  __| | |    |  __|    | |  |  __|
// | | \ \  / ____ \ |____| |____      | |__| | |____| |____| |____   | |  | |____
// |_|  \_\/_/    \_\_____|______|     |_____/|______|______|______|  |_|  |______|

//--------------------------------------------------------
//@request  : DELETE
//@route    : /api/profile/bloodpressure/:bloodpressure_id
//@access   : Private
//@desc     : delete blood pressure from the list
//--------------------------------------------------------

router.delete(
  "/bloodpressure/:bloodpressure_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //get remove index.
        const removeIndex = profile.bloodPressure
          .map(item => item.id)
          .indexOf(req.params.bloodpressure_id);

        //Splice out of array
        profile.bloodPressure.splice(removeIndex, 1);

        //save
        profile.save().then(profile => res.json(profile));
      })
      .catch(error => {
        res.status(404).json(error);
      });
  }
);

//--------------------------------------------------------
//@request  : GET
//@route    : /api/profile/race/:race_id
//@access   : Private
//@desc     : Get the Profile by user ID
//--------------------------------------------------------
router.get(
  "/race/:race_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["isAdmin"])
      .then(profile => {
        if (profile.user.isAdmin) {
          Profile.findOne({
            $or: [
              { "fiftyMetre._id": req.params.race_id },
              { "hundredMetre._id": req.params.race_id }
            ]
          })
            .then(race => {
              if (!race) {
                errors.race = "There is no profile for this user";
                res.status(404).json(errors);
              }
              res.json(race);
            })
            .catch(error => {
              res
                .status(404)
                .json({ race: "There is no profile for this user" });
            });
        } else {
          res.status(404).json({ error: "You are not an admin" });
        }
      })
      .catch(error => res.status(404).json(error));
  }
);

module.exports = router;
