const appRoot = require("app-root-path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const path = require("path");

const appSettings = require("../../../config/appSettings.json");
const getEnvSettings = require("../../../helpers/getEnvSettings");
const jsonResponse = require("../../../helpers/jsonResponse");
const { verifyToken } = require("../../../helpers/auth/tokenUtils");

const verifyJwtToken = (req, res, next) => {
  let response;

  const env = getEnvSettings();
  // const secret = env.JWT_ACCESS_TOKEN_SECRET;

  const token = req.headers.authorization;

  const tokenResult = verifyToken(token);

  if (tokenResult.status == 401) {
    console.log("token error");
  }

  if (tokenResult.status == 200) {
    console.log("Success!");
  }

  next();
};

module.exports = verifyJwtToken;
