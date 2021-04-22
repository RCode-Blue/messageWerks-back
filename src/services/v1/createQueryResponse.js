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

const postResponse = (isErr = null, docs = null, err = null) => {
  if (isErr) {
    return jsonResponse("400", "Server error", err);
  }
  return jsonResponse("200", "Item successfuly created", docs);
};

const deleteResponse = (isErr = null, result = null, err = null) => {
  // If error
  if (isErr) {
    return jsonResponse("400", "Error deleting item", err);
  }

  // Success
  return jsonResponse("200", "Successfully deleted item", result);
};

const alreadyExists = (isErr = null, result = null, err = null) => {
  // Already exists =  error
  if (isErr) {
    return jsonResponse("409", "Item already exists", result);
  }
  // Not found = no error
  return jsonResponse("404", "Item not found");
};

module.exports = { getResponse, postResponse, deleteResponse, alreadyExists };
