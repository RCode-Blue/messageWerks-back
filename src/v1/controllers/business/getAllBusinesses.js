/**
 * @description Handles GET requests to get all Businesses
 *
 * @module@name getAllBusinesses
 * @requires jsonResponse
 * @returns {jsonResponse} Standardised JSON object with a list of all businesses, or error message
 */

const jsonResponse = require("../../../helpers/jsonResponse");
const Business = require("../../../models").business;

const getAllBusinesses = async (queryType = null) => {
  let attributes, response;

  console.log("----- queryType: ", queryType);

  if (queryType === "nameOnly") {
    attributes = ["id", "name", "uuid"];
  } else {
    attributes = [
      "id",
      "name",
      "uuid",
      "address_line1",
      "address_line2",
      "suburb",
      "state",
      "country",
      "postcode",
    ];
  }

  try {
    let result = await Business.findAll({
      attributes,
    });
    response = jsonResponse(200, "", result);
  } catch (error) {
    response = jsonResponse(400, "", "", { error });
  }

  return response;
};

module.exports = getAllBusinesses;
