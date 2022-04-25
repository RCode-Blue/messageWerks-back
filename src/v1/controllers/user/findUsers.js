/**
 * @description User search functions
 *
 * @module
 * @name findUsers
 * @requires dbConnect
 * @requires jsonResponse
 */

const dbConnect = require("../../../config/elephantSql/elephantConnect");
const jsonResponse = require("../../services/jsonResponse");

const User = require("../../../models/User");

const db = dbConnect();

/**
 * @description GET a User by Primary Key
 *
 * @function
 * @param {string} id - Row id for the user
 * @returns {jsonResponse} Standardised JSON object containing User object, or error
 */
const byId = async (id) => {
  let response;
  try {
    let result = await User.findByPk(id, {
      attributes: [
        "id",
        "uuid",
        "role",
        "email",
        "first_name",
        "last_name",
        "createdAt",
        "updatedAt",
      ],
    });
    response = jsonResponse(200, "", result);
  } catch (error) {
    response = jsonResponse(400, "", "", { error: error });
  }
  return response;
};

/**
 * @description GET a User by ID
 *
 * @function
 * @param {string} uuid - UUID for the user
 * @returns {jsonResponse} Standardised JSON object containing User object, or error
 */
const byUuid = async (uuid) => {
  let response;
  try {
    let result = await User.findOne({ where: { uuid } });
    response = jsonResponse(200, "", result);
  } catch (error) {
    response = jsonResponse(400, "", "", { error: error });
  }
  return response;
};

module.exports = { byId, byUuid };
