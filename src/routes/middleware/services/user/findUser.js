const User = require("../../../../db/models/User");

const byId = async (id) => {
  const foundUser = await User.findById(id);
  // console.log(foundUser);
  return foundUser;
};

module.exports = { byId };
