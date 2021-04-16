const jsonResponse = require("../../../services/createJsonResponse");
const findEmailBody = require("../../../services/emailBody/findEmailBody");

const getEmailBody = async (req, res) => {
  console.log(req.params);
  // return;

  let result, response;

  if (req.params.code) {
    result = await findEmailBody.byCode(req.params.code);
    // console.log(result);
  }
  if (req.params.id) {
    result = await findEmailBody.byId(req.params.id);
  }
  if (result.err) {
    response = jsonResponse("400", "Error finding email body");
  } else if (!result.doc) {
    response = jsonResponse("404", "Email body not found");
  } else {
    response = jsonResponse("200", "Successfully found email body", result.doc);
  }
  return res.status(response.status).json(response);
};

module.exports = getEmailBody;
