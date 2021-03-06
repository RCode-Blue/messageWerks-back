const checkRolePermissions = require("../../../../services/user/checkRolePermissions");
const updateContactField = require("../../../../services/contact/updateContactField");
const jsonResponse = require("../../../../services/createJsonResponse.js");

const checkAllowedFields = (keyName) => {
  const allowedFields = ["dob", "social_media", "name", "address"];

  let allowedParam = 0;

  allowedFields.forEach((field) => {
    if (keyName === field) {
      allowedParam++;
    }
  });
  return allowedParam;
};

const patchContact = async (req, res) => {
  const { userId, acl_role } = req;
  const minRole = "all_admins";
  let response, keyName, result;

  const id = req.params.contact_id;

  // Use the first key only
  keyName = Object.keys(req.body)[0];

  // Check permissions
  response = checkRolePermissions(acl_role, minRole);
  if (response) {
    return res.status(response.status).json(response);
  }

  // Check allowed fields
  let allowedParam = checkAllowedFields(keyName);

  if (allowedParam === 0) {
    response = jsonResponse("400", "Field not allowed");
    return res.status(response.status).json(response);
  }

  result = await updateContactField(id, req.body);

  if (result.err) {
    response = jsonReponse("400", "Error", {
      err: result.err,
      details: result.result,
    });
  } else {
    response = jsonResponse("200", "Success", result.docs);
  }

  res.status(response.status).json(response);
};

module.exports = patchContact;
