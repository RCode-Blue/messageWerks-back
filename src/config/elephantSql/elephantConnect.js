/**
 * @description
 * Creates an object for connection to a PostgreSQL database<br>
 * Values are taken from app configuration settings and environmental variables
 *
 * @module
 * @name elephantConnect
 * @requires Sequelize
 * @returns {Sequelize} An instance of the Sequelize object with the required settings to connect to the database
 */

"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const appSettings = require("../../config/appSettings.json");

const elephantConnect = () => {
  const { project } = appSettings;

  const rootDir = path.dirname(__dirname);
  if (fs.existsSync(path.join(rootDir) + "/.env." + process.env.NODE_ENV)) {
    require("dotenv").config({
      path: `${rootDir}/.env.${process.env.NODE_ENV}`,
    });
  }
  const dbname = process.env.ELEPHANTSQL_DB;
  const host = process.env.ELEPHANTSQL_HOST;
  const password = process.env.ELEPHANTSQL_PASSWORD;
  const user = process.env.ELEPHANTSQL_USERID;

  const settings = {
    host,
    ...project.sequelize,
  };

  const sequelize = new Sequelize(dbname, user, password, settings);

  return sequelize;
};

module.exports = elephantConnect;
