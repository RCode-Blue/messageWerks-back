const checkRolePermissions = require("../../../services/user/checkRolePermissions");
const jsonResponse = require("../../../services/createJsonResponse");
const delUser = require("../../../services/user/delUser");

const deleteUser = async (req, res) => {
  const { acl_role } = req.params;
  let response;

  response = checkRolePermissions(acl_role, 95);
  if (response) {
    return res.status(response.status).json(response);
  }

  let result = await delUser(req.params.user_id);
  if (result.code === "500") {
    response = jsonResponse(result.code, "Error deleting user", result.error);
  }
  response = jsonResponse(
    result.code,
    "Successfully deleted user",
    result.docs
  );
  res.status(response.status).json(response);
};

module.exports = deleteUser;
