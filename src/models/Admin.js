const Sequelize = require("sequelize");
const dbConnect = require("../config/elephantSql/elephantConnect");
const settings = require("../config/appSettings.json")

const db = dbConnect();
const {dialect} = settings.project.sequelize

const sequelize = new Sequelize({
  dialect
})

const Admin = db.define("admins", {
  email: {
    type: sequelize.STRING,
  },
  first_name: {
    type: sequelize.STRING,
  },
  last_name: {
    type: sequelize.STRING,
  },
  slug: {
    type: sequelize.STRING,
  },
  password: {
    type: sequelize.STRING,
  },
});

module.exports = Admin;
