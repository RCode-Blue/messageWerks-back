const validate = require("validate.js");

/**
 * @description Checks address fields
 * @module
 * @name checkAddressFields
 * @requires validate.js
 *
 * @param {object} address - Address of contact
 * @returns {object} Validation results
 */
const checkAddressFields = (address) => {
  const { address_line1, country } = address;
  const constraints = {
    address_line1: {
      presence: { allowEmpty: false },
    },
    country: {
      presence: { allowEmpty: false },
    },
  };

  return validate(address, constraints);
};

module.exports = checkAddressFields;
