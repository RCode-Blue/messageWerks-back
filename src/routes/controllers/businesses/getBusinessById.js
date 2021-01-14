const searchBusinesses = require("../../../services/business/searchBusinesses");
const jsonResponse = require("../../../services/createJsonResponse");

const getBusinessById = async (req, res) => {
  const businessId = req.params.business_id;
  let response;

  let result = await searchBusinesses.byBusinessId(businessId);
  console.log(result);
  if (result.err) {
    response = jsonResponse("500", "Error finding business");
  }
  if (result.docs && result.docs.length === 0) {
    response = jsonResponse("404", "Business not found");
  }
  if (result.docs) {
    response = jsonResponse("200", "Business found", result.docs);
  }
  res.status(response.status).json(response);
};
module.exports = getBusinessById;
