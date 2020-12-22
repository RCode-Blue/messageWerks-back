const SocialMedia = require("../../../db/models/SocialMedia");
const User = require("../../../db/models/User");

const postSocialMedia = async (req, res) => {
  // console.log(req.body);
  // console.log(req.user.id);
  // const { type } = req.body;

  // const jsonResponse = require("../../../config/responseTemplates.json");
  const createJsonResponse = require("../../../services/createJsonResponse");
  const upsertSocialMedia = require("../../../services/socialMedia/upsertSocialMedia");

  const { body } = req;

  let response, sm;
  let results = [];

  // If not logged in
  if (!req.user) {
    response = createJsonResponse("_401", "Not logged in");
    return res.status(response.status).json(response);
  }

  // If no social media data
  if (!body.socialMedia) {
    // console.log(req.body);
    response = createJsonResponse("_400", "No Social Media information");
    return res.status(response.status).json(response);
  }

  let result = await upsertSocialMedia(body.socialMedia);
  // console.log(result);
  if ((result.status = 400)) {
    response = createJsonResponse("_400", "Bad request data", result.testData);
    return res.status(response.status).json(response);
  } else {
    response = createJsonResponse("_200", "Success", result.testResult);
    return res.status(response.status).json(response);
  }
};

module.exports = postSocialMedia;
