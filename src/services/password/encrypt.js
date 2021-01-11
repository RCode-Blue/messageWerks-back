const bcrypt = require("bcrypt");
// const saltRounds = 10;
const appValues = require("../../config/appValues.json");

const encrypt = async (password) => {
  const saltRounds = appValues.password.encryption.saltRounds;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hashSync(password, salt);
  return hash;
};

module.exports = encrypt;
