const createNewBusiness = require("../../../services/business/createNewBusinesses");
const jsonResponse = require("../../../services/createJsonResponse");

const postBusiness = async (req, res) => {
  // console.log(req);
  let response;

  let result = await createNewBusiness(req.body);
  console.log(result);
  if (result.err) {
    response = jsonResponse("500", "Error creating business", result.err);
  } else {
    response = jsonResponse(
      "200",
      "Successfully created business",
      result.docs
    );
  }
  res.status(response.status).json(response);
};
module.exports = postBusiness;
