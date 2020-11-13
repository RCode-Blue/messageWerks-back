/**
 * @description Creates new user
 * @async
 * @exports addUser
 * @name addUser
 * @borrows encrypt as encrypt
 * @param {Object} req - New user details
 * @returns {Object} - User object
 */
const User = require("../../db/models/User");
const encrypt = require("../../scripts/encrypt");

const addUser = async (req) => {
  const { name, address, gender, dob, email, password, status } = req.body;
  const encryptedPassword = await encrypt(password);

  // Create new user
  user = new User({
    name: {
      firstname: name.firstname,
      familyname: name.familyname,
    },
    address: {
      addressline1: address.addressline1,
      addressline2: address.addressline2,
      state: address.state,
      country: address.country,
    },
    gender,
    dob,
    email,
    password: encryptedPassword,
    status,
  });
  await user.save();
  return user;
};

module.exports = addUser;
