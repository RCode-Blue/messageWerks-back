/**
 * @description Handles DELETE request for a User
 * <br> Deletes an existing User
 *
 * @module
 * @name deleteUser
 * @requires jsonResponse
 * @param {object} userData  - User data
 * @param {string} userData.uuid  - User uuid
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
    // response = jsonResponse(200, "", result);
    response =
      result === 0
        ? jsonResponse(404, "User not found")
        : jsonResponse(200, "", result);
  } catch (error) {
    response = jsonResponse(400, "", "", { error });
  }
  return response;
};

module.exports = deleteUser;
