const validate = require("validate.js");

/**
 * @description Checks name fields
 * @module
 * @name checkNameFields
 * @requires validate.js
 *
 * @param {object} name Name of Contact
 * @returns {object} Validation results
 */
const checkNameFields = (name) => {
  const { first_name, family_name } = name;

  const constraints = {
    first_name: {
      presence: { allowEmpty: false },
    },
    family_name: {
      presence: { allowEmpty: false },
    },
  };

  return validate(name, constraints);
};

module.exports = checkNameFields;
