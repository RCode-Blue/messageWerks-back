const jsonResponse = require("../../../services/v1/createJsonResponse");
const editBusinessEmailBodies = require("../../../services/business/editBusinessEmailBodies");

const patchEmailBodies = async (req, res) => {
  // console.log(req.body);
  let result, response;
  const { method, businessId, bodyId } = req.body;

  if (method === "pull") {
    result = await editBusinessEmailBodies.pull(businessId, bodyId);
    // console.log(result);
    if (result.err) {
      response = jsonResponse("400", "Error modifying array");
    }
    response = jsonResponse("200", "Successfully updated array", result.result);
  }
  res.status(response.status).json(response);
};
module.exports = patchEmailBodies;
