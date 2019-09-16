const Validator = require("validator");
const _ = require("lodash");

module.exports = function validateInjuryInput(data) {
  let errors = {};

  data.injuryLocation = !_.isEmpty(data.injuryLocation)
    ? data.injuryLocation
    : "";
  data.injuryDescription = !_.isEmpty(data.injuryDescription)
    ? data.injuryDescription
    : "";
  data.returnIn = !_.isEmpty(data.returnIn) ? data.returnIn : "";

  //injuryLocation Validator
  if (Validator.isEmpty(data.injuryLocation)) {
    errors.injuryLocation = "The location of the injury is required.";
  }

  //returnIn Validator
  if (!Validator.isNumeric(data.returnIn)) {
    errors.returnIn = "Please use a number value. (Weeks)";
  }

  //returnIn Validator
  if (data.returnIn > 104) {
    errors.returnIn = "Must be less than 104 weeks (2 years)";
  }

  //injuryDescription Validator
  if (Validator.isEmpty(data.injuryDescription)) {
    errors.injuryDescription = "Injury description is required.";
  }

  //injuryDate Validator
  if (Validator.isEmpty(data.injuryDate)) {
    errors.injuryDate = "Injury date is required.";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
