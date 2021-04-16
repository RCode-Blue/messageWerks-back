const checkRolePermissions = require("../../../services/user/checkRolePermissions");
const removeContact = require("../../../services/contact/removeContact");
const jsonResponse = require("../../../services/createJsonResponse");

const deleteContact = async (req, res) => {
  const { userId, acl_role } = req;
  const id = req.params.contact_id;
  const minRole = "all_admins";

  let response, result;

  response = checkRolePermissions(acl_role, minRole);
  if (response) {
    return res.status(response.status).json(response);
  }

  result = await removeContact(id);
  if (result.err || result.doc === null) {
    response = jsonResponse("400", "Error deleting Contact", result);
  } else {
    response = jsonResponse("200", "Successfully deleted contact", result);
  }
  res.status(response.status).json(response);
};

module.exports = deleteContact;
