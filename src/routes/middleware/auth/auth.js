// const jwt = require("jsonwebtoken")
const jsonResponse = require("../../../services/createJsonResponse");
const authorise = require("../services/auth/authorise");

const auth = (req, res, next) => {
  const jwtKey = process.env.JWT_SECRET;
  const token = req.header("x-auth-token");
  let response;

  let result = authorise(jwtKey, token);

  if (result.error) {
    response = jsonResponse(result.error.status, result.error.msg);
    return res.status(response.status).json(response);
  }
  req.userId = result.user.id;
  next();
};
module.exports = auth;
