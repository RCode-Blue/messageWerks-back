const jsonResponse = require("../../../services/v1/createJsonResponse");
const findEmailBodies = require("../../../services/_old/emailBody/findEmailBodies");

const getEmailBodies = async (req, res) => {
  let result, response;

  result = await findEmailBodies.all();
  // console.log(result);
  if (result.err) {
    response = jsonResponse("400", "Error finding messages", result.err);
    return res.status(response.status).json(reponse);
  }
  if (result.docs.length === 0) {
    response = jsonResponse("404", "No messages found", result.docs);
    return res.status(response.status).json(reponse);
  }
  response = jsonResponse("200", "Messages found", result.docs);
  console.log("Response: ", response.status);
  res.status(response.status).json(response);
};

module.exports = getEmailBodies;
