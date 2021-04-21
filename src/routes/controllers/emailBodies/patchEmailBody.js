const editEmailBody = require("../../../services/emailBody/editEmailBody");
const jsonResponse = require("../../../services/v1/createJsonResponse");

const patchEmailBody = async (req, res) => {
  let response;

  const { emailBody_id, data } = req.body;

  let result = await editEmailBody(emailBody_id, data);

  if (result.err) {
    response = jsonResponse(
      "400",
      "Error making changes to email body",
      result.err
    );
  } else {
    response = jsonResponse(
      "200",
      "Successfully made changes to email body",
      result.doc,
      result.result
    );
  }
  res.status(response.status).json(response);
};

module.exports = patchEmailBody;
