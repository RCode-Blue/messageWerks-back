/**
 * @description Generates json response for API Requests
 * @module createQueryResponse
 */

const jsonResponse = require("./createJsonResponse");

/**
 * @description Response for GET requests
 * @function
 * @memberof module:createQueryResponse
 * @requires jsonResponse
 *
 * @param {boolean} err=null - Indicates if en error has occured
 * @param {object} found=null - Documents returned by query
 * @param {object} errDetails=null - Details of error, if any
 *
 * @returns {responseTemplate} jsonResponse - Custom JSON status response
 */
const getResponse = (isErr = null, docs = null, err = null) => {
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

/**
 * @description Response for POST requests
 * @function
 *
 * @param {boolean} err=null - Indicates if en error has occured
 * @param {object} found=null - Documents returned by query
 * @param {object} errDetails=null - Details of error, if any
 *
 * @returns {responseTemplate} Custom JSON status response
 */
const postResponse = (isErr = null, docs = null, err = null) => {
  if (isErr) {
    return jsonResponse("400", "Server error", err);
  }
  return jsonResponse("200", "Item successfuly created", docs);
};

/**
 * @description Response for DELETE requests
 * @function
 *
 * @param {boolean} err=null - Indicates if en error has occured
 * @param {object} found=null - Documents returned by query
 * @param {object} errDetails=null - Details of error, if any
 *
 * @returns {responseTemplate} Custom JSON status response
 */
const deleteResponse = (isErr = null, result = null, err = null) => {
  // If error
  if (isErr) {
    return jsonResponse("400", "Error deleting item", err);
  }

  // Success
  return jsonResponse("200", "Successfully deleted item", result);
};

/**
 * @description Response for PUT  requests
 * @function
 *
 * @param {boolean} err=null - Indicates if en error has occured
 * @param {object} found=null - Documents returned by query
 * @param {object} errDetails=null - Details of error, if any
 *
 * @returns {responseTemplate} Custom JSON status response
 */
const updateResponse = (isErr = null, result = null, err = null) => {
  if (isErr) {
    return jsonResponse("400", "Error updating item", err);
  }
  return jsonResponse("200", "Successfully updated item", result);
};

/**
 * @description Response for requests to check if item exists
 * @function
 *
 * @param {boolean} err=null - Indicates if en error has occured
 * @param {object} found=null - Documents returned by query
 * @param {object} errDetails=null - Details of error, if any
 *
 * @returns {responseTemplate} Custom JSON status response
 */
const alreadyExists = (isErr = null, result = null, err = null) => {
  // Already exists =  error
  if (isErr) {
    return jsonResponse("409", "Item already exists", result);
    // return true;
  }
  // Not found = no error
  return jsonResponse("404", "Item not found");
  // return false;
};
const doesExist = alreadyExists;

/**
 * @description Response for requests to check if item does not exist
 * @function
 *
 * @param {boolean} err=null - Indicates if en error has occured
 * @param {object} found=null - Documents returned by query
 * @param {object} errDetails=null - Details of error, if any
 *
 * @returns {responseTemplate} Custom JSON status response
 */
const doesNotExist = (isErr = null, result = null, err = null) => {
  // Already exists =  error
  if (isErr) {
    return jsonResponse("404", "Item not found");
    // return true;
  }
  // Not found = no error
  return jsonResponse("409", "Item already exist", result);
  // return false;
};

module.exports = {
  deleteResponse,
  getResponse,
  postResponse,

  updateResponse,
  alreadyExists,
  doesExist,
  doesNotExist,
};
