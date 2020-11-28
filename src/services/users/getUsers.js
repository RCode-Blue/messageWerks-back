const User = require("../../db/models/User");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.status(400).json({ errors: "User(s) not found" });
    }
    res.json(users);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = getUsers;
