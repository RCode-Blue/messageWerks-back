const confirmUser = require("../../../services/user/confirmUser");
const setConfirmationCode = require("../../../services/user/setConfirmationCode");

const setConfirmCode = async (req, res) => {
  let response = await setConfirmationCode(req.params.email);
  if (response.status === 200) {
    // TODO: Send email to user
  }
  res.status(response.status).json(response);
};

const confirm = async (req, res) => {
  let email, confirmation_code;
  if (req.params.email && req.params.confirmation_code) {
    email = req.params.email;
    confirmation_code = req.params.confirmation_code;
  }
  if (req.body.email && req.body.confirmation_code) {
    email = req.body.email;
    confirmation_code = req.body.confirmation_code;
  }
  let response = await confirmUser(email, confirmation_code);
  if (response.status === 200) {
    // TODO: Send email to user
  }
  res.status(response.status).json(response);
};

module.exports = { setConfirmCode, confirm };
