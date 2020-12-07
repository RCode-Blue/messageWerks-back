/**
 * @description Encrypts a password
 * @async
 * @requires bcrypt
 * @name encrypt
 * @param {string} password - User password
 * @returns {string} - password hash
 * @exports encrypt
 */

const bcrypt = require("bcrypt");

const saltRounds = 10;

const encrypt = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hashSync(password, salt);
  return hash;
};

module.exports = encrypt;
