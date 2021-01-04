const User = require("../../db/models/User");

// Find user by email
// {email: <email>}
const byEmail = async (data) => {
  return await User.findOne(data);
};

// Find by user id
// {id: <id>}
const byUserId = async (data) => {
  try {
    return await User.findById(data);
  } catch (err) {
    return {
      statusCode: 500,
      name: "Server Error",
      message: err.message,
    };
  }
};

module.exports = { byEmail, byUserId };
