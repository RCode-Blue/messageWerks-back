const { body, check, checkSchema } = require("express-validator");

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

  // const test = [body("email").isEmail(), body("password").exists()];
  // console.log(test);
  return test;
};
module.exports = checkLoginFields;
