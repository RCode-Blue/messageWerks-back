/**
 * @description Returns environment settings
 *
 * @function
 * @name getEnvSettings
 * @memberof helpers#
 */

const appRoot = require("app-root-path");
const fs = require("fs");
const path = require("path");

const getEnvSettings = () => {
  const rootPath = appRoot.path;
  if (fs.existsSync(path.join(rootPath) + "/.env." + process.env.NODE_ENV)) {
    require("dotenv").config({
      path: `${rootPath}/.env.${process.env.NODE_ENV}`,
    });
  }

  return process.env;
};
module.exports = getEnvSettings;
