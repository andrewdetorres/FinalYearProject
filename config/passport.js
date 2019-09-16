const JwtStratergy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("./keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretKey;

module.exports = passport => {
  passport.use(
    new JwtStratergy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            //return done with now errors and the user as the parameters
            return done(null, user);
          } else {
            //return done with no errors and the user as FALSE for the parameters
            return done(null, false);
          }
        })
        .catch(error => {
          console.log(`error = ${error}`);
        });
    })
  );
};
