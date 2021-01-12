const setResetCode = require("../../../services/password/setResetCode");

const passwordResetEnable = async (req, res) => {
  const email = req.params.user_email;
  let response = await setResetCode(email);
  // console.log(response);
  res.status(response.status).json(response);
};
module.exports = passwordResetEnable;
