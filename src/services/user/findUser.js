const User = require("../../db/models/User");

const projection = [];
const options = {
  populate: "contact",
};

// Find user by email
// {email: <email>}
const byEmail = async (data) => {
  return await User.findOne(data, projection, options);
};

// Find by user id
// {id: <id>}
const byUserId = async (id) => {
  return await User.findById(id, projection, options);
};

// Find by contact id
// expects: <id>
const byContactId = async (id) => {
  let data = { contact: id };
  return await User.findOne(data, projection, options);
};

module.exports = { byEmail, byUserId, byContactId };
