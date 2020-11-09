/**
 * @description Checks new user input form data
 * @exports checkUserRegistration
 * @name checkUserRegistration
 * @requires express-validator
 * @param {Object} req - New user details
 * @returns {Object} validationResult
 * @throws {string} - Error if: <ul> <li>no first name</li> <li>no famiy name</li> <li>incomplete address</li> <li>gender or password</li> </ul>
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
