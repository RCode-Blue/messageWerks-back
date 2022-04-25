/**
 * @description Handles DELETE request for a user
 * <br> Deletes an existing user
 *
 * @module
 * @name deleteUser
 * @requires jsonResponse
 * @param {object} User  - User data
 * @returns {jsonResponse} Standardised JSON object
 */

const User = require("../../../models/User");
const pgResponse = require("../../services/jsonResponse");

const deleteUser = async (userData) => {
  const { uuid } = userData;
  let response;
  try {
    let result = await User.destroy({
      where: { uuid },
    });
    response = pgResponse(200, "", result);
  } catch (error) {
    response = pgResponse(400, "", "", { error });
  }
  return response;
};

module.exports = deleteUser;
