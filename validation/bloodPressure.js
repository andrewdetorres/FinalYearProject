const Validator = require("validator");
const _ = require("lodash");

module.exports = function validateBloodPressureInput(data) {
  let errors = {};

  data.bloodPressureReading = !_.isEmpty(data.bloodPressureReading)
    ? data.bloodPressureReading
    : "";

  //bloodPressureReading Validator
  if (Validator.isEmpty(data.bloodPressureReading)) {
    errors.bloodPressureReading = "Current Blood Pressure is required.";
  }

  //bloodPressureReading Validator
  if (Validator.isEmpty(data.bloodPressureDate)) {
    errors.bloodPressureDate = "Blood Pressure date is required.";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
