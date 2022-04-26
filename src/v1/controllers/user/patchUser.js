/**
 * @description Handles PATCH requests for a User.
 * <br> Edits existing user data, except for password.
 * <br> User is located based on uuid.
 *
 * @module
 * @name patchUser
 * @requires jsonResponse
 * @param {object} User - User data
 * @param {string} [User.email] - User email
 * @param {string} [User.uuid] - User uuid
 * @param {integer} [User.role] - User role
 * @param {string} [User.first_name] - User first name
 * @param {string} [User.last_name ] - User last name
 *
 * @returns {jsonResponse} Standardised JSON object
 */

const User = require("../../../models/User");

const pgResponse = require("../../../helpers/jsonResponse");

const patchUser = async (userData) => {
  const { uuid } = userData;
  delete userData.uuid;
  if (userData.password) {
    delete userData.password;
  }
  let response;
  try {
    await User.sync();
    let result = await User.update(userData, {
      where: { uuid },
      returning: true,
    });
    response = pgResponse(200, "", result);
  } catch (error) {
    response = pgResponse(400, "", "", { error });
  }

  return response;
};

module.exports = patchUser;
