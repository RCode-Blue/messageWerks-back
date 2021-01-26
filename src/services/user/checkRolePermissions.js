const jsonTemplate = require("../../services/createJsonResponse");

const checkRolePermissions = (acl_role, min_value) => {
  // Convert acl_role from text to integer
  role = parseInt(acl_role);
  let response;

  if (role < min_value) {
    response = jsonTemplate(
      "401",
      "You are not authorised to perform this action"
    );
  } else {
    response = null;
  }
  return response;
};

module.exports = checkRolePermissions;
