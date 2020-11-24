const Profile = require("../../db/models/Profile");

const checkSocialFields = require("../../services/profiles/checkSocialFields");

const updateUserProfile = async (profile, res) => {
  const options = { new: true };
  function handleResult(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  }

  Profile.findByIdAndUpdate(profile.id, profile, options, handleResult);
};

const getUserProfile = async (id, res) => {
  try {
    const profile = await Profile.findOne({
      user: id,
    }).populate("user");

    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }
    return profile;
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports = async (req, res) => {
  let userProfile;

  // Validate Social Media fields
  const validationResults = checkSocialFields(req);

  const checkObjBlank = (errObj) => {
    return Object.keys(errObj).length == 0;
  };

  let socialFieldErrs = validationResults.every(checkObjBlank);

  // Get and update user profile
  socialFieldErrs == true
    ? (userProfile = await getUserProfile(req.user.id, res))
    : res.status(400).json({ validationResults });

  userProfile.socialmedia = req.body.socialmedia;

  await updateUserProfile(userProfile, res);
};
