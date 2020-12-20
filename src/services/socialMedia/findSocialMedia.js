const SocialMedia = require("../../db/models/SocialMedia");

const byId = async (id) => {
  return await SocialMedia.findById(id);
};

const byUserId = async (userId) => {
  return await SocialMedia.find({
    principal: {
      user: userId,
    },
  });
};

const byBusinessId = async (businessId) => {
  return await SocialMedia.find({
    principal: {
      business: businessId,
    },
  });
};

const bySocialMedia = async (smName) => {
  return await SocialMedia.find({ media: smName });
};

const bySocialMediaId = async (smId) => {
  return await SocialMedia.find({ user_id: smId });
};

const byCombo = async (smName, smId) => {
  return await SocialMedia.find(
    { media: smName, user_id: smId },
    function (err, docs) {}
  );
};

module.exports = {
  byId,
  byUserId,
  byBusinessId,
  bySocialMedia,
  bySocialMediaId,
  byCombo,
};
