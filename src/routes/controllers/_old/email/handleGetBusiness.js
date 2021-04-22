const findBusinesses = require("../../../services/_old/business/findBusinesses");
const jsonResponse = require("../../../services/v1/createJsonResponse");

const handleGetBusiness = async (req, res) => {
  const { business_id } = req.body;
  let businessSearchResult = await findBusinesses.byBusinessId(business_id);
  let foundBusiness = null;

  if (businessSearchResult.err) {
    response = jsonResponse(
      "400",
      "Error searching business",
      businessSearchResult.err
    );
    res.status(response.status).json(response);
    return { err: businessSearchResult.err };
  }

  if (!businessSearchResult.docs) {
    // foundBusiness = null;
    response = jsonResponse("404", "Business not found");
    res.status(response.status).json(response);
  } else {
    foundBusiness = businessSearchResult.docs;
  }

  return foundBusiness;
};

module.exports = handleGetBusiness;
