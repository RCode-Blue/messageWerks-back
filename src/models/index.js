/**
 * @description Sequelize initialization<br>
 * All controller models are referenced to this module
 * All model relationships are declared here
 * @name Models
 *
 * @requires Sequelize
 * @returns {object} AN object containing all declared models
 */

const dbConnect = require("../config/elephantSql/elephantConnect");
const Sequelize = require("sequelize");
const sequelize = dbConnect();

const user = require("./User");

const db = {};
db.user = user(sequelize, Sequelize);

module.exports = db;
