const validate = require("validate.js");

const responseTemplates = require("../config/responseTemplates.json");

const checkEmailField = (email) => {
  // console.log(email);
  constraints = {
    email: {
      email: true,
    },
  };
  var result = validate(email, constraints);
  if (result !== undefined) {
    let response = responseTemplates._400;
    response.message = "Invalid email";
    response.data = result;
    return response;
  }
};

module.exports = checkEmailField;
