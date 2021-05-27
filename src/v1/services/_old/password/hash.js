const bcrypt = require("bcrypt");

const appValues = require("../../config/appValues.json");

const createHash = async (password) => {
  const saltRounds = appValues.password.encryption.saltRounds;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hashSync(password, salt);
  return hash;
};

module.exports = createHash;
