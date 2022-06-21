/**
 * @description Handles GET request to get all Users
 *
 * @module
 * @name getAllUsers
 * @requires jsonResponse
 * @returns {jsonResponse} Standardised JSON object with a list of all users, or error message
 */

const jsonResponse = require("../../../helpers/jsonResponse");
const {
  includeBusinesses,
  userQueryAttributes,
} = require("../../../helpers/queryHelpers");

const User = require("../../../models").user;

const getAllUsers = async () => {
  let response;
  const attributes = userQueryAttributes();

  let include = includeBusinesses();

  try {
    let result = await User.findAll({
      attributes,
      include,
    });

    response = jsonResponse(200, "", result);
  } catch (error) {
    response = jsonResponse(400, "", "", { error });
  }
  return response;
};

module.exports = getAllUsers;
