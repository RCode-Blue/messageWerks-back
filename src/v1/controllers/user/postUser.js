/**
 * @description Handles POST request for a User.
 * <br> Creates new user.
 * <br> UUID for User is generated automatically
 *
 * @module
 * @name postUser
 * @requires jsonResponse
 * @param {object} User - User data
 * @param {string} User.email - User email
 * @param {integer} User.role - User role
 * @param {string} User.first_name - User first name
 * @param {string} User.last_name -User last name
 * @param {string} User.password - User password
 *
 * @returns {jsonResponse} Standardised JSON object
 */

const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
// const User = require("../../../models/User");
const User = require("../../../models").user;

const pgResponse = require("../../../helpers/jsonResponse");

// Config imports
const rootDir = path.dirname(__dirname);
if (fs.existsSync(path.join(rootDir) + "/.env." + process.env.NODE_ENV)) {
  require("dotenv").config({ path: `${rootDir}/.env.${process.env.NODE_ENV}` });
}

const generateHash = (password) => {
  const saltRounds = parseInt(process.env.ENCRYPTION_SALT_ROUNDS);
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const postUser = async (data) => {
  data.password = generateHash(data.password);

  let response;
  try {
    await User.sync();
    let result = await User.create(data);
    response = pgResponse(200, "", result);
  } catch (error) {
    response = pgResponse(400, "", "", { error });
  }
  return response;
};

module.exports = postUser;
