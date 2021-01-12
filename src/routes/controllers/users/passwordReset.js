const resetPassword = require("../../../services/password/resetPassword");

const passwordReset = async (req, res) => {
  const email = req.params.email;
  const reset_code = req.params.reset_code;
  const passwords = req.body.passwords;

  let response = await resetPassword(email, reset_code, passwords);
  res.status(response.status).json(response);
};

module.exports = passwordReset;
