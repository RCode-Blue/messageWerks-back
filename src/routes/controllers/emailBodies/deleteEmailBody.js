const jsonResponse = require("../../../services/v1/createJsonResponse");
const editBusinessEmailBodies = require("../../../services/business/editBusinessEmailBodies");
const removeEmailBody = require("../../../services/emailBody/removeEmailBody");

const deleteEmailBody = async (req, res) => {
  let response, bodyId, body_result, businessId, business_result;

  if (req.body.emailbody.code) {
    let bodyCode = req.body.emailbody.code;
    body_result = await removeEmailBody.byCode(bodyCode);
    bodyId = body_result.result._id;
  }

  if (req.body.emailbody.id) {
    bodyId = req.body.emailbody.id;
    body_result = await removeEmailBody.byId(bodyId);
  }

  console.log("body_result: ", body_result);

  if (body_result.err) {
    response = jsonResponse("400", "Error deleting email body", result.err);
    return res.status(response.status).json(response);
  }

  businessId = body_result.result.business;

  business_result = await editBusinessEmailBodies.pull(businessId, bodyId);
  console.log("business_result: ", business_result);
  if (business_result.err) {
    response = jsonResponse("400", "Error deleting array", result.err);
  } else {
    response = jsonResponse(
      "200",
      "Successfully updated array",
      business_result
    );
  }
  res.status(response.status).json(response);
};

module.exports = deleteEmailBody;
