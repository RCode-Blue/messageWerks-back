const jsonResponse = require("../../../services/createJsonResponse");
const delUser = require("../../../services/user/delUser");

const deleteUser = async (req, res) => {
  let response;

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
