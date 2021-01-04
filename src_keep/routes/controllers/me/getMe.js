const User = require("../../../db/models/User");
const jsonResponse = require("../../../services/createJsonResponse");

const getMe = async (req, res) => {
  let response;
  try {
    let usr = await User.findById(req.user.id).exec();
    response = jsonResponse("_200", "User found", usr);
    return res.status(response.status).json(response);
  } catch (err) {
    response = jsonResponse("_404", "User not found", err);
    return res.status(response.status).json(response);
  }
};

module.exports = getMe;
