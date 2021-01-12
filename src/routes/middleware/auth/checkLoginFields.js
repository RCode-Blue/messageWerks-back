const validate = require("validate.js");

const checkLoginFields = (req, res, next) => {
  let validationResult = {};
  const { email, password } = req.body;
  const constraints = {
    email: {
      email: {
        message: "Email is not valid",
      },
    },
    password: {
      length: {
        minimum: 8,
        tooShort: "Miniumum password length is 8 characters",
      },
    },
  };
  validationResult.login = validate({ email, password }, constraints);

  for (var key in validationResult) {
    if (validationResult[key] !== undefined) {
      response = jsonResponse("400", "Input field errors", validationResult);
      res.status(response.status).json(response);
    }
  }

  next();
};

module.exports = checkLoginFields;
