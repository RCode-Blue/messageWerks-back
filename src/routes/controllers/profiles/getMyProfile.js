/**
 * @description Gets a logged in user's profile
 * @param {Object} req - Express request object - User ID
 * @param {Object} res - Express response object - User profile
 * @throws Throws error if no user profile is found
 * @throws Error is the is a problem retrieving data from the server
 * @returns {Object} profile - User profile
 */
const Profile = require("../../../db/models/Profile");

const getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user");
    if (!profile) {
      return res.status(400).json({
        msg: "Profile not found",
      });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = getMyProfile;
