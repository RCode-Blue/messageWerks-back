const jsonResponse = require("../../../services/v1/createJsonResponse");
const createNewEmailBody = require("../../../services/emailBody/createNewEmailBody");

const postEmailBody = async (req, res) => {
  // console.log(req.body);
  let result, response;

  if (
    !req.body.business_id ||
    !req.body.name ||
    !req.body.status ||
    !req.body.type ||
    (!req.body.html_part && !req.body.text_part)
  ) {
    response = jsonResponse("400", "Insufficient data");
    return res.status(response.status).json(response);
  }

  result = await createNewEmailBody(req.body);
  console.log(result);

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
