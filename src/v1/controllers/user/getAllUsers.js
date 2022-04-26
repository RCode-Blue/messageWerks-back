/**
 * @description Handles GET request to get all users
 *
 * @module
 * @name getAllUsers
 * @requires jsonResponse
 * @returns {jsonResponse} Standardised JSON object with a list of all users, or error message
 */

const dbConnect = require("../../../config/elephantSql/elephantConnect");
const pgResponse = require("../../../helpers/jsonResponse");

const User = require("../../../models/User");

const db = dbConnect();

const getAllUsers = async () => {
  let response;
  const attributes = [
    "id",
    "role",
    "email",
    "first_name",
    "last_name",
    "password",
  ];
  try {
    let result = await User.findAll({
      attributes,
    });
    response = pgResponse(200, "", result);
  } catch (error) {
    response = pgResponse(400, "", "", { error });
  }
  return response;
};

module.exports = getAllUsers;
