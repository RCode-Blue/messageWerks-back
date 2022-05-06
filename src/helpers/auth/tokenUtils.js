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

const appSettings = require("../../config/appSettings.json");
const { jwt_values } = appSettings;

// Config imports
const rootPath = appRoot.path;
if (fs.existsSync(path.join(rootPath) + "/.env." + process.env.NODE_ENV)) {
  require("dotenv").config({
    path: `${rootPath}/.env.${process.env.NODE_ENV}`,
  });
}

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

/**
 * @description Generates a JWT token
 *
 * @function generateToken
 * @param {object} tokenRequestData
 * @param {integer} tokenRequestData.role - User role
 * @param {string} tokenRequestData.uuid - User UUID
 * @param {string} tokenRequestData.type - Type of token requested
 * @param {string} tokenRequestData.project_id - Project ID
 */
const generateToken = (tokenRequestData) => {
  const { role, uuid } = tokenRequestData.user;
  const { type } = tokenRequestData;
  const project_id = appSettings.project.project_id;
  const payload = {
    role,
    uuid,
    project_id,
    token: { value: null },
  };

  const tokenSettings = getTokenSettings(type);
  const token = jwt.sign(payload, tokenSettings.secret, tokenSettings.options);

  payload.token.value = token;
  return payload;
};

module.exports = { generateToken };
