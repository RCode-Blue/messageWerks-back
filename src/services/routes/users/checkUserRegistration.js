/**
 * @description Checks new user input form data
 * @exports checkUserRegistration
 * @name checkUserRegistration
 * @function
 * @requires express-validator
 * @param {Object} req - New user details
 */

const { checkSchema } = require("express-validator");

exports.checkUserRegistration = () => {
  // console.log(req.body);
  return checkSchema({
    "name.firstname": {
      notEmpty: true,
      errorMessage: "First name cannot be blank",
    },
    "name.familyname": {
      notEmpty: true,
      errorMessage: "Family name cannot be blank",
    },
    "address.addressline1": {
      notEmpty: true,
      errorMessage: "Address line 1 cannot be blank",
    },
    "address.state": {
      notEmpty: true,
      errorMessage: "State / Province cannot be blank",
    },
    "address.country": {
      notEmpty: true,
      errorMessage: "Country cannot be blank",
    },
    gender: {
      notEmpty: true,
      errorMessage: "Gender cannot be blank",
    },
    password: {
      isLength: { min: 8 },
      errorMessage: "Please enter password in 8 or more characters",
    },
  });
};
