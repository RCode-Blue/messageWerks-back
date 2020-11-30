/**
 * @description Returns a profile given a user ID
 * @requires Profile
 * @param {Object} req - Express request - user ID
 * @param {Object} res - Express response
 * @throws Error is profile is not found
 * @throws Error if cannot retrieve data from server
 * @returns {Object} User profile
 */
const Profile = require("../../../db/models/Profile");

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
