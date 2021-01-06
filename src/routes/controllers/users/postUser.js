// const User = require("../../../db/models/User");
const createUser = require("../../../services/user/createUser");
const jsonResponse = require("../../../services/createJsonResponse");

const postUser = async (req, res) => {
  let response, result;

  const data = req.body;
  result = createUser(data);
  if (result.err) {
    response = jsonResponse("400", "Error creating user", response.err);
  } else {
    response = jsonResponse("200", "Success", err.doc);
  }
  req.status(result.status).json(result);
};

module.exports = postUser;
