const appRoot = require("app-root-path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const path = require("path");

const appSettings = require("../../../config/appSettings.json");
const getEnvSettings = require("../../../helpers/getEnvSettings");
const jsonResponse = require("../../../helpers/jsonResponse");

const verifyJwtToken = (req, res, next) => {
  let response;

  const env = getEnvSettings();
  const secret = env.JWT_ACCESS_TOKEN_SECRET;

  const headerData = req.headers;
  let token = headerData.authorization.split(" ")[1];

  try {
    let result = jwt.verify(token, secret);
    console.log("result: ", result);
    // response = jsonResponse(200, "Header check", result);
  } catch (error) {
    response = jsonResponse(401, "", "", error);
    res.status(response.status).json(response);
  }

  next();
};

module.exports = verifyJwtToken;
