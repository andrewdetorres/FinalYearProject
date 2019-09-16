const Validator = require("validator");
const _ = require("lodash");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.username = !_.isEmpty(data.username) ? data.username : "";
  data.dateOfBirth = !_.isEmpty(data.dateOfBirth) ? data.dateOfBirth : "";
  data.gender = !_.isEmpty(data.gender) ? data.gender : "";

  //Username Validation
  if (!Validator.isLength(data.username, { min: 6, max: 30 })) {
    errors.username = "Username must be between 6 and 30 characters";
  }
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  }

  //dateOfBirth Validation
  if (Validator.isEmpty(data.dateOfBirth)) {
    errors.dateOfBirth = "Date Of Birth is required";
  }

  //Gender Validation
  if (Validator.isEmpty(data.gender)) {
    errors.gender = "Gender is required";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
