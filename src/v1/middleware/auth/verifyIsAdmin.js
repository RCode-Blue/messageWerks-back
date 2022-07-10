const jwt_decode = require("jwt-decode");
const jsonResponse = require("../../../helpers/jsonResponse");
const appSettings = require("../../../config/appSettings.json");

const verifyIsAdmin = async (req, res, next) => {
  let response;
  const token = req.headers.authorization;
  const adminLevel = appSettings.access_levels.administrator;
  const role = jwt_decode(token).role;

  if (parseInt(role) < parseInt(adminLevel)) {
    console.log("--- not admin ---");
    response = jsonResponse(403, "Not an administrator");
    return res.status(response.status).json(response);
  }
  console.log("--- is admin ---");
  next();
};

module.exports = verifyIsAdmin;
