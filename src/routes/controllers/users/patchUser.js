const editAclRole = require("../../../services/user/editAclRole");
const editPassword = require("../../../services/user/editPassword");
const changeResetCode = require("../../../services/user/changeResetCode");
const editStatus = require("../../../services/user/editStatus");

const patchUser = async (req, res) => {
  let response;
  const id = req.params.user_id;

  // Edit password
  if (req.body.passwords) {
    response = await editPassword(id, req.body.passwords);
    console.log(response);
  }

  // Edit acl_role
  if (req.body.acl_role) {
    const { acl_role } = req.body;
    response = editAclRole(id, req.body.acl_role);
  }

  // Edit status
  if (req.body.status) {
    const { status } = req.body;
    response = editStatus;
    id, req.body.status;
  }

  res.status(response.status).json(response);
};

module.exports = patchUser;
