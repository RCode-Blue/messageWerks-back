const setResetCode = require("../../../services/user/setResetCode");

const passwordResetEnable = async (req, res) => {
  const email = req.params.user_email;
  let response = await setResetCode(email);
  // console.log(response);

  // TODO: send email to contact

  res.status(response.status).json(response);
};
module.exports = passwordResetEnable;
