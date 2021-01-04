const updateContactField = require("../../../services/contact/updateContactField");
const jsonResponse = require("../../../services/createJsonResponse.js");

const patchContact = async (req, res) => {
  const allowedFields = [
    "dob",
    "social_media",
    "mj_contact_id",
    "name",
    "address",
  ];

  let response, keyName, result;
  let allowedParam = 0;
  const id = req.params.contact_id;

  // Use the first key only
  keyName = Object.keys(req.body)[0];

  allowedFields.forEach((field) => {
    if (keyName === field) {
      allowedParam++;
    }
  });

  if (allowedParam === 0) {
    response = jsonResponse("400", "Key name not allowed");
    return res.status(response.status).json(response);
  }

  result = await updateContactField(id, req.body);

  if (result.err) {
    response = jsonReponse("400", "Error", {
      err: result.err,
      details: result.result,
    });
  } else {
    response = jsonResponse("200", "Success", result.doc);
  }

  res.status(response.status).json(response);
};

module.exports = patchContact;
