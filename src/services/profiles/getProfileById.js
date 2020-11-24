const Profile = require("../../db/models/Profile");

const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user");

    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports = getProfileById;
