/**
 * @description Gets a logged in user's profile
 * @param {Object} req - Express request object - User ID
 * @param {Object} res - Express response object - User profile
 * @throws Throws error if no user profile is found
 * @throws Error is the is a problem retrieving data from the server
 * @returns {Object} profile - User profile
 */
const Profile = require("../../../db/models/Profile");
const jsonResponse = require("../../../services/createJsonResponse");

const getMyProfile = async (req, res) => {
  let response;
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user");
    if (!profile) {
      response = jsonResponse("_400", "Profile not found", req.user);
      return res.status(response.status).json(response);
      // return res.status(400).json({
      //   msg: "Profile not found",
      // });
    }
    reponse = jsonResponse("_200", "Success", { user, profile });
    res.status(response.status).json(response);
    // res.json(profile);
  } catch (err) {
    console.error(err.message);
    response = jsonResponse("_500", "Server error");
    res.status(res.status).json(response);
    // res.status(500).send("Server Error");
  }
};

module.exports = getMyProfile;
