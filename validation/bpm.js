const Validator = require("validator");
const _ = require("lodash");

module.exports = function validateBPMInput(data) {
  let errors = {};

  data.BPMReading = !_.isEmpty(data.BPMReading) ? data.BPMReading : "";

  //BPMReading Validator
  if (Validator.isEmpty(data.BPMReading)) {
    errors.BPMReading = "Current BPM recording is required.";
  }

  //BPMReading Validator
  if (data.BPMReading > 250) {
    errors.BPMReading = "Current BPM must be lower that 250";
  }

  //BPMDate Validator
  if (Validator.isEmpty(data.BPMDate)) {
    errors.BPMDate = "BPM date is required.";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
