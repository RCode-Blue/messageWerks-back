const Profile = require("../../db/models/Profile");

const getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user");
    if (!profile) {
      return res.status(400).json({
        msg: "There is no profile for this user",
      });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = getMyProfile;
