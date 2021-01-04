/**
 * @description Creates a new user
 *
 * @function createUser
 * @returns {object} - User object
 * @async
 *
 * @requires encrypt
 * @requires User
 * @requires appValues
 * @borrows encrypt
 * @borrows User
 * @borrows appValues
 *
 * @param {object} req - New user details
 * @throws {object} err if cannot save to database
 */
const User = require("../../db/models/User");
const encrypt = require("../encrypt");
const appValues = require("../../config/appValues.json");

const createUser = async (req, res) => {
  const { name, address, dob, email, password, role, status } = req.body;
  let requestedRole = appValues.role[role];
  const encryptedPassword = await encrypt(password);

  // Create new user
  try {
    const user = new User({
      name,
      dob,
      email,
      password: encryptedPassword,
      role: {
        code: requestedRole.code,
        name: requestedRole.name,
      },
      status,
    });
    await user.save();
    return user;
  } catch (err) {
    throw err;
  }
};

module.exports = createUser;
