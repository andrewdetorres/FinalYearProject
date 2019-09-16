const Validator = require("validator");
const _ = require("lodash");

module.exports = function validateHundredMetreInput(data) {
  let errors = {};

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
