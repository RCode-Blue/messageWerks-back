const SocialMedia = require("../../../db/models/SocialMedia");

const getSocialMedia = async (req, res) => {
  let sm;
  if (req.body.userId) {
  }
  if (req.body.userIds) {
  }
  if (req.user) {
  }
  sm = SocialMedia.find({});
};

module.exports = getSocialMedia;
