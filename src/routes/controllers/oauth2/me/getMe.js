const jsonResponse = require("../../../../services/createJsonResponse");
// const searchContact = require("../../../services/contact/searchContact");
const searchUser = require("../../../../services/user/searchUser");

const getMe = async (req, res) => {
  const { userId } = req;
  const user = (await searchUser.byUserId(userId)).docs;

  const data = { user };
  let response = jsonResponse("200", "User found", data);
  res.status(response.status).json(response);
};
module.exports = getMe;
