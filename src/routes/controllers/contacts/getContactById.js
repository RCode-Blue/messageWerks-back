const checkRolePermissions = require("../../../services/user/checkRolePermissions");
const processFetchResponse = require("../../../services/processFetchResponse");
const searchContact = require("../../../services/contact/searchContact");

const getContactById = async (req, res) => {
  const minRole = "all_admins";

  const { acl_role } = req;
  const id = req.params.contact_id;

  let response;

  response = checkRolePermissions(acl_role, minRole);

  if (response) {
    return res.status(response.status).json(response);
  }

  let result = await searchContact.byId(id);
  response = processFetchResponse(result);

  res.status(response.status).json(response);
};

module.exports = getContactById;
