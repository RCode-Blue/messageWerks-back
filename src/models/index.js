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

const business = require("./Business");
const user = require("./User");

const db = {};
db.user = user(sequelize, Sequelize);
db.business = business(sequelize, Sequelize);

const business_user = sequelize.define("business_user", {});

db.user.belongsToMany(db.business, {
  through: "business_user",
  as: "businesses",
  foreignKey: "user_id",
});

db.business.belongsToMany(db.user, {
  through: "business_user",
  as: "users",
  foreignKey: "business_id",
});
sequelize.sync();

module.exports = db;
