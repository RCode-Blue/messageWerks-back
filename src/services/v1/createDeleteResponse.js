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

const createDeleteResponse = (isErr = null, result = null, err = null) => {
  // If error
  if (isErr) {
    // console.log("err");
    return jsonResponse("400", "Error deleting item", err);
  }

  // Success
  return jsonResponse("200", "Successfully deleted item", result);
};

module.exports = createDeleteResponse;
