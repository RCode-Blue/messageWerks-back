// const jwt = require("jsonwebtoken")
// const jsonResponse = require('../../../services/createJsonResponse')
const authorise = require("../services/auth/authorise");

const auth = (req, res, next) => {
  const key = process.env.JWT_SECRET;
  const token = req.header("x-auth-token");

  let result = authorise(key, token);
  console.log(result);
};
module.exports = auth;
