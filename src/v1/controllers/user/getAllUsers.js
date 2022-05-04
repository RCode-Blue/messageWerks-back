/**
 * @description Handles GET request to get all users
 *
 * @module
 * @name getAllUsers
 * @requires jsonResponse
 * @returns {jsonResponse} Standardised JSON object with a list of all users, or error message
 */

const jsonResponse = require("../../../helpers/jsonResponse");

const User = require("../../../models").user;

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
    response = jsonResponse(200, "", result);
  } catch (error) {
    response = jsonResponse(400, "", "", { error });
  }
  return response;
};

module.exports = getAllUsers;
