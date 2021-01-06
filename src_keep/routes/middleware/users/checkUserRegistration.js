/**
 * @description Express middleware - Checks new user input form data
 * @name checkUserRegistration
 * @exports checkUserRegistration
 * @requires express-validator
 * @param {Object} req - New user details
 * @throws {string} - Error if: <ul> <li>no first name</li> <li>no famiy name</li> <li>incomplete address</li> <li>gender or password</li> </ul>
 * @returns {Object} ValidationChain - Field validation results
 */
const { checkSchema } = require("express-validator");

const appValues = require("../../../config/appValues.json");
const minPwdLength = appValues.user.minPasswordLength;

exports.checkUserRegistration = () => {
  return checkSchema({
    email: {
      isEmail: true,
      errorMessage: "Email address is not valid",
    },
    password: {
      isLength: { min: minPwdLength },
      errorMessage: "Please enter password in 8 or more characters",
    },
  });
};