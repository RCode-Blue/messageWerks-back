const createEmailBody = require("../../../services/emailBodies/createNewEmailBody");
const jsonResponse = require("../../../services/createJsonResponse");
const createNewEmailBody = require("../../../services/emailBodies/createNewEmailBody");

const postEmailBody = async (req, res) => {
  // console.log(req.body);
  let result, response;

  if (!req.body.business || !req.body.name || !req.body.body) {
    response = jsonResponse("400", "Insufficient data");
    return res.status(response.status).json(response);
  }

  result = await createNewEmailBody(req.body);
  // console.log(result);

  if (result.emailBody.err) {
    response = jsonResponse("400", "Error creating new email body", result);
  } else if (result.business.err) {
    response = jsonResponse("400", "Error updating business", result);
  } else {
    response = jsonResponse(
      "200",
      "Successfully updated email body and business",
      result
    );
  }

  res.status(response.status).json(response);

  // res.send("POST");
};

module.exports = postEmailBody;
