const jsonResponse = require("../../../services/v1/createJsonResponse");
const resetPassword = require("../../../services/password/resetPassword");

const passwordReset = async (req, res) => {
  let email, reset_code, passwords, response;
  if (req.params.email && req.params.reset_code) {
    email = req.params.email;
    reset_code = req.params.reset_code;
  } else if (req.body.email && req.body.reset_code) {
    email = req.body.email;
    reset_code = req.body.reset_code;
  } else {
    response = jsonResponse("400", "Insufficient data");
    return res.status(response.status).json(response);
  }

  passwords = req.body.passwords;

  response = await resetPassword(email, reset_code, passwords);
  res.status(response.status).json(response);
};

module.exports = passwordReset;
