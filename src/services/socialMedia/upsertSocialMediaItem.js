const SocialMedia = require("../../db/models/SocialMedia");

const createSocialMedia = async (req, res) => {
  const { type, media } = req.body;

  const jsonResponse = require("../../config/responseTemplates.json");
};

module.exports = createSocialMedia;
