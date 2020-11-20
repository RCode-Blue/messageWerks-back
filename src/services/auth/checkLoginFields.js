/**
 * @description Checks login form data
 * @name checkLoginFields
 * @exports checkLoginFields
 * @requires express-validator
 * @param {string} email - Email address
 * @param {string} password - Password
 * @returns {array} ValidationChain - Field validation results
 */
const { checkSchema } = require("express-validator");

const checkLoginFields = () => {
  const test = checkSchema({
    email: {
      isEmail: true,
      errorMessage: "Email is invalid",
    },
    password: {
      notEmpty: true,
      errorMessage: "Password cannot be blank",
    },
  });

  return test;
};
module.exports = checkLoginFields;
