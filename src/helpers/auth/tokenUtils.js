/**
 * JSON Web Token
 * @external jwt
 * @see {@link https://www.npmjs.com/package/jsonwebtoken}
 */

/**
 * @description Utilities for working with JWT Tokens
 * @module
 * @name tokenUtils
 *
 * @requires external:jwt
 */

const appRoot = require("app-root-path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const path = require("path");
const jwt_decode = require("jwt-decode");

const appSettings = require("../../config/appSettings.json");
const getEnvSettings = require("../../helpers/getEnvSettings");
const { jwt_values } = appSettings;
const jsonResponse = require("../../helpers/jsonResponse");
const redisUtils = require("./redisUtils");

// Config imports
const rootPath = appRoot.path;
const env = getEnvSettings();

if (fs.existsSync(path.join(rootPath) + "/.env." + process.env.NODE_ENV)) {
  require("dotenv").config({
    path: `${rootPath}/.env.${process.env.NODE_ENV}`,
  });
}

// Helpers
const getTokenSettings = (tokenType) => {
  let tokenSettings = {};

  switch (tokenType) {
    case "access":
      tokenSettings.options = jwt_values.access_options;
      tokenSettings.secret = process.env.JWT_ACCESS_TOKEN_SECRET;
      break;
    case "refresh":
      tokenSettings.options = jwt_values.refresh_options;
      tokenSettings.secret = process.env.JWT_REFRESH_TOKEN_SECRET;
      break;
  }
  return tokenSettings;
};

const checkRefreshToken = async (uuid) => {
  const refreshTokenExists = await redisUtils.checkRefreshToken(uuid);
  return refreshTokenExists;
};

// Exported
/**
 * @description Generates a JWT token
 *
 * @function generateToken
 * @param {object} tokenRequestData
 * @param {integer} tokenRequestData.role - User role
 * @param {string} tokenRequestData.uuid - User UUID
 * @param {string} tokenRequestData.type - Type of token requested
 * @param {string} tokenRequestData.project_id - Project ID
 *
 * @memberof helpers#
 */
const generateToken = (tokenRequestData) => {
  const { role, uuid } = tokenRequestData.user;
  const { type } = tokenRequestData;
  let tokenPayload = {
    role,
    uuid,
  };

  const tokenSettings = getTokenSettings(type);
  const token = jwt.sign(
    tokenPayload,
    tokenSettings.secret,
    tokenSettings.options
  );
  return token;
};

/**
 * @description Verifies a JWT token
 *
 * @function varifyToken
 * @param {string} JET token to be verified
 *
 * @memberof helpers#
 */
const verifyToken = (token) => {
  let response;
  const secret = env.JWT_ACCESS_TOKEN_SECRET;
  try {
    let result = jwt.verify(token, secret);
    response = jsonResponse(200, "Successfully Verified Token", result);
  } catch (error) {
    response = jsonResponse(401, "Token verification error", "", error);
  }
  return response;
};

module.exports = { generateToken, verifyToken };
