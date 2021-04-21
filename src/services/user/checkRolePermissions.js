const appValues = require("../../config/appValues.json");
const jsonTemplate = require("../v1/createJsonResponse");

const checkRolePermissions = (acl_role, min_role) => {
  // Convert acl_role from text to integer
  const assignedRoles = appValues.user.acl_role;
  const min_value = assignedRoles[min_role].code;
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
