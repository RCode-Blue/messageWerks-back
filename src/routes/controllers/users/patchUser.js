const changeResetCode = require("../../../services/user/changeResetCode");
const checkRolePermissions = require("../../../services/user/checkRolePermissions");
const editAclRole = require("../../../services/user/editAclRole");
const editPassword = require("../../../services/user/editPassword");
const editStatus = require("../../../services/user/editStatus");
const jsonResponse = require("../../../services/createJsonResponse");

/*
  expects:
  req.body.request{ 
    {
      newPasswords: { 
        newPassword1: <newpassword>, 
        newPassword2: <newpassword> 
      }
    } 
    || 
    { 
      new_acl_role: <newRole>
    } 
    || 
    { 
      newStatus: <newStatus>
    }
  }

  response in jsonResponse format
*/

const patchUser = async (req, res) => {
  // console.log(req);
  let response;
  const { acl_role } = req;
  const userId = req.params.user_id;

  // Check permissions
  response = checkRolePermissions(acl_role, 95);
  if (response) {
    return res.status(response.status).json(response);
  }

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
