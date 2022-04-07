const Sequelize = require("sequelize");
const dbConnect = require("../config/elephantSql/elephantConnect");

const sequelize = dbConnect();

const User = sequelize.define("users", {
  email: {
    type: Sequelize.STRING,
  },
  firstName: {
    type: Sequelize.STRING,
    field: "first_name",
  },
  lastName: {
    type: Sequelize.STRING,
    field: "last_name",
  },
  slug: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});

module.exports = User;
