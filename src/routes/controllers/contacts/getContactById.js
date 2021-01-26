const checkRolePermissions = require("../../../services/user/checkRolePermissions");
const jsonResponse = require("../../../services/createJsonResponse");
const processFetchResponse = require("../../../services/processFetchResponse");
const searchContact = require("../../../services/contact/searchContact");

const getContactById = async (req, res) => {
  const { acl_role } = req;
  const id = req.params.contact_id;

  let response;

  response = checkRolePermissions(acl_role, 95);

  if (response) {
    return res.status(response.status).json(response);
  }

  let result = await searchContact.findContactById(id);
  response = processFetchResponse(result);

  res.status(response.status).json(response);
};

module.exports = getContactById;
