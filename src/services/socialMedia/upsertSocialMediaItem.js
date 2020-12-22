const SocialMedia = require("../../db/models/SocialMedia");

const createSocialMediaItem = async (socialMedia) => {
  const { media, userid, principal } = socialMedia;
  // const { userAccount } = principal;
  let filter;
  // console.log(media, ":", userid, ":");
  if (principal.businessAccount) {
    filter = {
      media: media,
      userid: userid,
    };
  }
  if (principal.userAccount) {
    filter = {
      media,
      userid,
      "principal.userAccount": principal.userAccount,
    };
  }

  console.log(await SocialMedia.find(filter));

  const jsonResponse = require("../../config/responseTemplates.json");
};

module.exports = createSocialMediaItem;
