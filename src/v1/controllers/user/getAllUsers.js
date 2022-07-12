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

const getAllUsers = async (queryType = null) => {
  let response, include, queryParameters;
  const attributes = userQueryAttributes(queryType);
  include = includeBusinesses();

  if (queryType === "nameOnly") {
    queryParameters = { attributes };
  } else
    queryParameters = {
      attributes,
      include,
    };

  try {
    let result = await User.findAll(queryParameters);

    response = jsonResponse(200, "", result);
  } catch (error) {
    response = jsonResponse(400, "", "", { error });
  }
  return response;
};

module.exports = getAllUsers;
