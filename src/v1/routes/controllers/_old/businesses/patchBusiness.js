const editBusinessFields = require("../../../services/_old/business/editBusinessFields");
const jsonResponse = require("../../../services/v1/createJsonResponse");

/*
  expects:
  {
    business_fields: {...
    business_arrays: {...
    business_keys:   {...
  }
*/

const patchBusiness = async (req, res) => {
  let response;
  // Business fields
  if (req.body.business_fields) {
    const id = req.params.business_id;
    const { business_fields } = req.body;
    results = await editBusinessFields(id, business_fields);

    let errors = 0;

    for (const [key, value] of Object.entries(results)) {
      if (value.error) {
        errors++;
      }
    }

    if (errors > 0) {
      response = jsonResponse(
        "500",
        "Error(s) in one or more entries",
        results
      );
    } else {
      response = jsonResponse(
        "200",
        "Successfully updated Business fields",
        results
      );
    }
  }

  res.status(response.status).json(response);
};

module.exports = patchBusiness;
