// Checks if user is logged in
const jsonResponse = require("../../../services/createJsonResponse");
const authorise = require("../services/auth/authorise");

const auth = (req, res, next) => {
  const jwtSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
  const accessToken = req.header("x-auth-token");
  let response;

  // Check if Access token is still valid
  //  - if yes, use it
  //  - if no, generate new one

  let result = authorise(jwtSecret, accessToken);

  if (result.error) {
    response = jsonResponse(result.error.status, result.error.msg);
    return res.status(response.status).json(response);
  }
  req.userId = result.user.id;
  next();
};
module.exports = auth;
