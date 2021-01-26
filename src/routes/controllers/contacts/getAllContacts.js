const checkRolePermissions = require("../../../services/user/checkRolePermissions");
const fetchAllContacts = require("../../../services/contact/fetchAllContacts");
const processFetchResponse = require("../../../services/processFetchResponse");

const getAllContacts = async (req, res) => {
  const { acl_role } = req;
  let response;

  response = checkRolePermissions(acl_role, 80);
  if (response) {
    return res.status(response.status).json(response);
  }
  let result = await fetchAllContacts();
  response = processFetchResponse(result);

  res.status(response.status).json(response);
};

module.exports = getAllContacts;
