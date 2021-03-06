const jsonTemplate = require("../../../../services/createJsonResponse");
const fetchUsers = require("../../../../services/user/fetchUsers");
const checkRolePermissions = require("../../../../services/user/checkRolePermissions");

/**
 * @description Gets all Users
 *
 * @module
 * @name getUsers
 *
 * @param {object} req Request object
 * @param {object} res Response object
 *
 * @returns {responseTemplate} response
 *
 */

const getUsers = async (req, res) => {
  // const { acl_role } = req;
  const minRole = "all_admins";
  let response;

  /*
  response = checkRolePermissions(acl_role, minRole);
  if (response) {
    return res.status(response.status).json(response);
  }
  */

  const filter = {};
  const projection = {};
  const options = {
    populate: "contact",
  };

  let result = await fetchUsers(filter, projection, options);

  if (!result.err || result.result.doc.length < 1) {
    response = jsonTemplate("400", "Error retrieving Users", result.err);
  }
  response = jsonTemplate("200", "Successfuly retrieved Users", result.doc);

  res.status(response.status).json(response);
};
module.exports = getUsers;
