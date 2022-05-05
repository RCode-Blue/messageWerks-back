/**
 * @description Handles DELETE request for a Business
 * <br> Deletes an existing Business
 *
 * @module
 * @name deleteBusiness
 * @requires jsonResponse
 * @param {object} businessData - Business data
 * @param {string} businessData.uuid - Business uuid
 * @returns {jsonResponse} Standardised JSON object
 */

const Business = require("../../../models").business;
const jsonResponse = require("../../../helpers/jsonResponse");

const deleteBusiness = async (businessData) => {
  const { uuid } = businessData;
  let response;
  try {
    let result = await Business.destroy({
      where: { uuid },
    });
    response =
      result === 0
        ? jsonResponse(404, "Business not found")
        : jsonResponse(200, "", result);
  } catch (error) {
    response = jsonResponse(400, "", "", { error });
  }
  return response;
};

module.exports = deleteBusiness;
