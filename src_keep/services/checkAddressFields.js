const { response } = require("express");
const validate = require("validate.js");

const responseTemplates = require("../config/responseTemplates.json");

const checkAddressFields = (address) => {
  console.log(address);

  const constraints = {
    addressline1: {
      presence: {
        allowEmpty: false,
      },
    },
    city: {
      presence: { allowEmpty: false },
    },
    country: {
      presence: { allowEmpty: false },
    },
  };

  // var result = validate(address, constraints);
  var result = validate(address, constraints);
  // console.log(result);
  if (result !== undefined) {
    let response = responseTemplates._400;
    response.message = "Empty fields";
    response.data = result;
    return response;
  }
};

module.exports = checkAddressFields;
