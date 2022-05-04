/**
 * @description User model
 * @name User
 */
/**
 * @typedef User
 * @property {email} User.email - User's email
 * @property {uuid} User.uuid - User's unique identifier
 * @property {integer} User.role - User's role - determines level of access
 * @property {string} User.first_name - User's first name
 * @property {string} User.last_name - User's last name
 * @property {string} User.password - User's password
 */

const userModel = (sequelize, DataTypes) => {
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

  return User;
};

module.exports = userModel;
