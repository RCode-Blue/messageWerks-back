const appValues = require("../../config/appValues.json");
const findUser = require("./searchUser");
const jsonResponse = require("../v1/createJsonResponse");

const editAclRole = async (id, acl_role) => {
  const allowed_acl_roles = appValues.acl_role;
  let response;
  let allowed = 0;
  allowed_acl -
    roles.array.forEach((role) => {
      if (acl_role === allowed_acl_roles) {
        allowed++;
      }
    });
  if (allowed === 0) {
    response = jsonResponse("400", "Value not allowed");
  } else {
    let user = findUser.byUserId(id);
    try {
      user.acl_role = acl_role;
      await user.save();
      response = jsonResponse("200", "Successfully updated role", user);
    } catch (err) {
      response = jsonResponse("500", "Error updating user role");
    }
  }
  return response;
};

module.exports = editAclRole;
