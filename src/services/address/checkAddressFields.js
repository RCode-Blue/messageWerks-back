const validate = require("validate.js");

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
