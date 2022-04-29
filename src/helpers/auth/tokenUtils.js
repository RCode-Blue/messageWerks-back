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

const generateToken = (data) => {
  const { role, uuid } = data.user;
  const { type } = data;
  const project_id = appSettings.project.project_id;
  const payload = {
    role,
    uuid,
    project_id,
  };

  const tokenSettings = getTokenSettings(type);

  const token = jwt.sign(payload, tokenSettings.secret, tokenSettings.options);
  payload.token = token;
  return payload;
};

module.exports = { generateToken };
