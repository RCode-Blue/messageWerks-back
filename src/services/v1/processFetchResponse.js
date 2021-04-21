const jsonResponse = require("./createJsonResponse");
/**
 * @description Returns an appropriate JSON Response depending on result
 *
 * @module
 * @name processFetchResponse
 *
 * @param {object} result - Result of a query or request
 * @returns {object} response - Custom JSON response object to be sent to client (refer Type Definitions)
 */

const processFetchResponse = (result) => {
  let response;

  if (result.err) {
    response = jsonResponse("400", "Server error", result.err);
  } else if (!result.docs) {
    response = jsonResponse("404", "Item not found");
  } else {
    response = jsonResponse("200", "Success", result.docs);
  }

  return response;
};

module.exports = processFetchResponse;
