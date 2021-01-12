const findUser = require("../../../services/user/searchUser");
const jsonResponse = require("../../../services/createJsonResponse");

const getUser = async (req, res) => {
  const id = req.params.user_id;
  const user = await findUser.byUserId(id);

  let response = jsonResponse("200", "Successfully found user", user);
  res.status(response.status).json(response);
};

module.exports = getUser;
