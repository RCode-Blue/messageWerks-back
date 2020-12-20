/**
 * @description Creates / Updates user profile
 * @name postProfile
 * @exports postProfile
 * @requires Profile
 * @borrows Profile
 * @returns {Object} - User Profile
 */
const Profile = require("../../../db/models/Profile");

// const jsonTemplates = require("../../../config/responseTemplates.json");
const jsonResponse = require("../../../services/createJsonResponse");

const postProfile = async (req, res) => {
  const { type, name, address, dob, social_media } = req.body;
  let response;

  const data = {
    user: req.user.id,
    name: {
      firstname: name.firstname,
      middlename: name.middlename,
      familyname: name.familyname,
    },
    address,
    dob,
    social_media,
  };

  const newProfile = new Profile(data);
  const filter = { user: req.user.id };
  const settings = { new: true, upsert: true };

  try {
    await Profile.findOneAndUpdate(filter, data, settings);

    response = jsonResponse("_200", "Success", newProfile);
    res.status(response.status).json(response);
  } catch (err) {
    console.error(err.message);
    response = jsonResponse("_500", "Server error");
    res.status(response.status).json(response);
  }
};

module.exports = postProfile;
