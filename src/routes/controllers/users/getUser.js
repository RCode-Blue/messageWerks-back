const checkRolePermissions = require("../../../services/user/checkRolePermissions");
const findUser = require("../../../services/user/searchUser");
const jsonResponse = require("../../../services/createJsonResponse");

const getUser = async (req, res) => {
  const { acl_role } = req;
  const id = req.params.user_id;

  let response;

  response = checkRolePermissions(acl_role, 90);
  if (response) {
    return res.status(response.status).json(response);
  }

  const user = await findUser.byUserId(id);

  response = jsonResponse("200", "Successfully found user", user);
  res.status(response.status).json(response);
};

module.exports = getUser;
