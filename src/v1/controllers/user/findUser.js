/**
 * @description User search functions
 *
 * @module
 * @name findUser
 * @requires User
 * @requires jsonResponse
 */

const {
  includeBusinesses,
  userQueryAttributes,
} = require("../../../helpers/queryHelpers");
const jsonResponse = require("../../../helpers/jsonResponse");
const User = require("../../../models").user;

/**
 * @description GET a User by Primary Key
 * @name byId
 *
 * @function
 * @param {string} id - Row id for the user
 *
 * @returns {jsonResponse} Standardised JSON object containing User object, or error
 */
const byId = async (id) => {
  let response;
  try {
    let result = await User.findByPk(id, {
      attributes: userQueryAttributes(),
    });
    response = jsonResponse(200, "", result);
  } catch (error) {
    response = jsonResponse(400, "", "", { error: error });
  }
  return response;
};

/**
 * @description GET a User by UUID
 * @name byUuid
 *
 * @function
 * @param {string} uuid - UUID for the user
 * @returns {jsonResponse} Standardised JSON object containing User object, or error
 */
const byUuid = async (uuid) => {
  let response;
  const include = includeBusinesses();

  try {
    let result = await User.findOne({
      where: { uuid: uuid },
      attributes: userQueryAttributes(),
      include,
    });
    response = jsonResponse(200, "", result);
  } catch (error) {
    response = jsonResponse(400, "", "", { error });
  }
  return response;
};

/**
 * @description GET a User by email
 * @name byEmail
 *
 * @function
 * @param {string} email - User's email
 * @returns {jsonResponse} Standardised JSON object containing User object, or error
 */
const byEmail = async (email) => {
  let response;
  try {
    let result = await User.findOne({ where: { email } });
    response = jsonResponse(200, "", result);
  } catch (error) {
    response = jsonResponse(400, "", "", { error: error });
  }
  return response;
};

module.exports = { byEmail, byId, byUuid };
