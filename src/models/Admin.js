const Sequelize = require("sequelize");
const dbConnect = require("../config/elephantSql/elephantConnect");

const db = dbConnect();

const Admin = db.define("admins", {
  email: {
    type: Sequelize.STRING,
  },
  first_name: {
    type: Sequelize.STRING,
  },
  last_name: {
    type: Sequelize.STRING,
  },
  slug: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});

module.exports = Admin;
