/**
 * @Description Creates / Updates user profile
 * @name postProfile
 * @exports postProfile
 * @requires Profile
 * @borrows Profile
 * @returns {Object} - User Profile
 */
const Profile = require("../../../db/models/Profile");

const postProfile = async (req, res) => {
  const { address, dob, socialmedia } = req.body;

  const data = {
    user: req.user.id,
    address: {
      addressline1: address.addressline1,
      addressline2: address.addressline2,
      city: address.city,
      state: address.state,
      country: address.country,
      zip: address.zip,
    },
    dob,
    socialmedia,
  };

  const newProfile = new Profile(data);
  const filter = { user: req.user.id };
  const settings = { new: true, upsert: true };

  try {
    await Profile.findOneAndUpdate(filter, data, settings);

    res.json(newProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = postProfile;
