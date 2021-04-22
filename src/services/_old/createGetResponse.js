/**
 * @description Generates json response
 * @description Returns an object
 *
 * @module
 * @name createQueryResponse
 *
 * @param {boolean} err - Indicates if en error has occured
 * @param {object} found=null - Documents returned by query
 * @param {object} errDetails - Details of error, if any
 *
 * @returns {responseTemplate} undefined
 */

const jsonResponse = require("./createJsonResponse");

const createGetResponse = (isErr = null, docs = null, err = null) => {
  // If error
  if (isErr) {
    return jsonResponse("400", "Server error", err);
  }

  // If no Docs found
  if (docs === null || docs.length === 0) {
    return jsonResponse("404", "Item is not found");
  }

  // Successful query
  return jsonResponse("200", "Query success", docs);
};

module.exports = createGetResponse;
