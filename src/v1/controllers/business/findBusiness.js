/**
 * @description Business search options
 *
 * @module
 * @name findBusiness
 * @requires Business
 * @requires jsonResponse
 */

const jsonResponse = require("../../../helpers/jsonResponse");
const Business = require("../../../models").business;
const { user } = require("../../../models");

/**
 * @description GET a Business by UUID
 * @name byUuid
 *
 * @function
 * @param {string} uuid - UUID for the Business
 * @returns {jsonResponse} Standardised JSON object containing Business object, or error
 */

const include = [
  {
    model: user,
    as: "users",
    attributes: ["id", "email", "uuid", "role", "first_name", "last_name"],
  },
];

const byUuid = async (uuid) => {
  let response;
  try {
    let result = await Business.findOne({
      where: { uuid },
      include,
    });
    response = jsonResponse(200, "", result);
  } catch (error) {
    response = jsonResponse(400, "", "", { error });
  }
  return response;
};
module.exports = { byUuid };
