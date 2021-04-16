const changeResetCode = require("../../../services/user/changeResetCode");
const checkRolePermissions = require("../../../services/user/checkRolePermissions");
const editAclRole = require("../../../services/user/editAclRole");
const editPassword = require("../../../services/user/editPassword");
const editStatus = require("../../../services/user/editStatus");
const jsonResponse = require("../../../services/createJsonResponse");

/*
  expects:
  req.body.request{ 
    { newPasswords: { 
        current_password: <currentpassword>,
        new_password_1: <newpassword>, 
        new_password_2: <newpassword> 
      }
    } 
    || 
    { newPasswords: {
        new_password_1: <newpassword>, 
        new_password_2: <newpassword> 
      }
    } 
    ||
    { new_acl_role: <newRole> } 
    || 
    { newStatus: <newStatus> }
  }
*/

const patchUser = async (req, res) => {
  let response;
  const { acl_role } = req;
  const userId = req.params.user_id;
  const minRole = "all_admins";

  /*
  // Check permissions
  response = checkRolePermissions(acl_role, minRole);
  if (response) {
    return res.status(response.status).json(response);
  }
  */

  // Edit password
  if (req.body.request.newPasswords) {
    response = await editPassword(userId, req.body.request.newPasswords);
    return res.status(response.status).json(response);
  }

  // Edit acl_role
  if (req.body.request.new_acl_role) {
    response = await editAclRole(userId, req.body.request.new_acl_role);
    return res.status(response.status).json(response);
  }

  // Edit status
  if (req.body.request.newStatus) {
    response = await editStatus(userId, req.body.request.newStatus);
    return res.status(response.status).json(response);
  }
};

module.exports = patchUser;
