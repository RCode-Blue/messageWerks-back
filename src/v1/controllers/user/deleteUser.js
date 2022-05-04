/**
 * @description Handles DELETE request for a user
 * <br> Deletes an existing user
 *
 * @module
 * @name deleteUser
 * @requires jsonResponse
 * @param {object} User  - User data
 * @param {string} User.uuid  - User uuid
 * @returns {jsonResponse} Standardised JSON object
 */

const User = require("../../../models").user;
const jsonResponse = require("../../../helpers/jsonResponse");

const deleteUser = async (userData) => {
  const { uuid } = userData;
  let response;
  try {
    let result = await User.destroy({
      where: { uuid },
    });
    response = jsonResponse(200, "", result);
  } catch (error) {
    response = jsonResponse(400, "", "", { error });
  }
  return response;
};

module.exports = deleteUser;
