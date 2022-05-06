/**
 * @description Handles POST request for a Business.
 * <br> Creates new Business.
 * <br> UUID for Business is generated automatically
 *
 * @module
 * @name postBusiness
 * @requires jsonResponse
 * @param {object} businessData - User data
 * @param {string} businessData.address_line1 - Business address line 1
 * @param {string} businessData.address_line2 - Business address line 2
 * @param {string} businessData.suburb - Business address suburb
 * @param {string} businessData.state - Business address state
 * @param {string} businessData.country - Business address country
 * @param {string} businessData.postcode - Business address postcode
 *
 * @returns {jsonResponse} Standardised JSON object
 */
const Business = require("../../../models").business;
const jsonResponse = require("../../../helpers/jsonResponse");

const postBusiness = async (businessData) => {
  let response;
  try {
    await Business.sync();
    let result = await Business.create(businessData);
    response = jsonResponse(200, "", result);
  } catch (error) {
    response = jsonResponse(400, "", "", { error });
  }
  return response;
};

module.exports = postBusiness;
