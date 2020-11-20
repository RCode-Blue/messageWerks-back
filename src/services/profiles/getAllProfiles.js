const Profile = require("../../db/models/Profile");

const getAllProfiles = async (req, res) => {
  const allProfiles = await Profile.find({})
    .limit(10)
    .populate("user")
    .sort({ "user.name.familyname": 1 });

  console.log(allProfiles);
  res.json(allProfiles);
};

module.exports = getAllProfiles;
