"use strict";

const fs = require("fs");
const path = require("path");

const Sequelize = require("sequelize");

const elephantConnect = () => {
  const rootDir = path.dirname(__dirname);
  if (fs.existsSync(path.join(rootDir) + "/.env." + process.env.NODE_ENV)) {
    require("dotenv").config({
      path: `${rootDir}/.env.${process.env.NODE_ENV}`,
    });
  }

  const settings = {
    dbHost: process.env.ELEPHANTSQL_HOST,
    user: process.env.ELEPHANTSQL_USERID,
    password: process.env.ELEPHANTSQL_PASSWORD,
    dbname: process.env.ELEPHANTSQL_DB,
    dialect: process.env.ELEPHANTSQL_DIALECT,
    keepAlive:true,
    pool: {
      max: parseInt(process.env.ELEPHANTSQL_POOL_MAX),
      min: parseInt(process.env.ELEPHANTSQL_POOL_MIN),
      acquire: parseInt(process.env.ELEPHANTSQL_POOL_ACQUIRE),
      idle: parseInt(process.env.ELEPHANTSQL_POOL_IDLE),
    },
  };

  const { dbHost, user, password, dbname, dialect, pool } = settings;

  const sequelize = new Sequelize(dbname, user, password, {
    host: dbHost,
    dialect: dialect,
    operatorAliases: false,
    pool: { pool },
  });

  return sequelize;
};

module.exports = elephantConnect;
