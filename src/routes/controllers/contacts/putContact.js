const checkRolePermissions = require("../../../services/user/checkRolePermissions");
const jsonResponse = require("../../../services/createJsonResponse");
const searchContact = require("../../../services/contact/searchContact");
const updateContact = require("../../../services/contact/updateContact");

const putContact = async (req, res) => {
  const { acl_role } = req;
  let response, result;
  const id = req.params.contact_id;
  const data = req.body;

  // Check permission
  response = checkRolePermissions(acl_role, 95);
  if (response) {
    return res.status(response.status).json(response);
  }

  // if (parseInt(acl_role) < 95) {
  //   response = jsonResponse(
  //     "401",
  //     "You do not have permission to perform this operation"
  //   );
  //   return res.status(response.status).json(response);
  // }

  // Update
  const email = await searchContact.getEmailfromContactId(id);
  data.email = email;

  result = await updateContact(data, id);
  if (result.err) {
    response = jsonResponse("400", "Error updating contact", result.err);
  }
  response = jsonResponse("200", "Successfully updated contact", result.doc);

  res.status(response.status).json(response);
};

module.exports = putContact;
