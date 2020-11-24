const Profile = require("../../db/models/Profile");

const getUserProfile = async (userId) => {
  try {
    const profile = await Profile.findOne({
      user: userId,
    }).populate("user");

    if (!profile) {
      return status(400).json({ msg: "Profile not found" });
    }
    return json(profile);
  } catch (err) {
    console.error(err.message);
    return status(500).json({ msg: "Server error" });
  }
};

module.exports = getUserProfile;
