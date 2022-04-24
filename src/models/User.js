const DataTypes = require("sequelize");
const dbConnect = require("../config/elephantSql/elephantConnect");

const sequelize = dbConnect();

const User = sequelize.define("users", {
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
  },
  role: {
    type: DataTypes.INTEGER,
  },
  first_name: {
    type: DataTypes.STRING,
  },
  last_name: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
});

module.exports = User;
