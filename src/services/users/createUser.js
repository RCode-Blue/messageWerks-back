/**
 * @description Creates a new user
 * @name createUser
 * @exports createUser
 * @requires encrypt as encrypt
 * @requires User as User
 * @param {Object} req - New user details
 * @borrows User
 * @borrows encrypt
 * @returns {Object} - User object
 */
const User = require("../../db/models/User");
const encrypt = require("../encrypt");

const createUser = async (req, res) => {
  const { name, email, password, status } = req.body;
  const encryptedPassword = await encrypt(password);

  // Create new user
  const user = new User({
    name: {
      firstname: name.firstname,
      middlename: name.middlename,
      familyname: name.familyname,
    },
    email,
    password: encryptedPassword,
    status,
  });
  await user.save();
  return user;
};

module.exports = createUser;
