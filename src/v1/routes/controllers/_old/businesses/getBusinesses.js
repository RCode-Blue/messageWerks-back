const findBusinesses = require("../../../services/_old/business/findBusinesses");
const jsonResponse = require("../../../services/v1/createJsonResponse");

const getBusinesses = async (req, res) => {
  let response;
  let result = await findBusinesses.all();

  if (result.err) {
    response = jsonResponse("500", "Error finding businesses");
  }
  if (!result.err && result.docs.length === 0) {
    response = jsonResponse("404", "No business found");
    return res.status(response.status).json(response);
  }
  if (result.docs) {
    response = jsonResponse("200", "Businesses found", result.docs);
  }
  res.status(response.status).json(response);
};
module.exports = getBusinesses;
