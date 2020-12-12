/**
 * @description Creates a new user
 *
 * @function createUser
 * @returns {object} - User object
 * @async
 *
 * @requires encrypt
 * @requires User
 * @borrows encrypt
 * @borrows User
 *
 * @param {object} req - New user details
 * @throws {object} err if cannot save to database
 */
const User = require("../../db/models/User");
const encrypt = require("../encrypt");

const createUser = async (req, res) => {
  const { email, password } = req.body;
  const encryptedPassword = await encrypt(password);

  // Create new user
  try {
    const user = new User({
      email,
      password: encryptedPassword,
    });
    await user.save();
    return user;
  } catch (err) {
    throw err;
  }
};

module.exports = createUser;
