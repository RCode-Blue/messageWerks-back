const User = require("../../db/models/User");

// Find user by email
// {email: <email>}
const byEmail = async (data) => {
  return await User.findOne(data);
};

// Find by user id
// {id: <id>}
const byUserId = async (data) => {
  return await User.findById(data);
};

module.exports = { byEmail, byUserId };
