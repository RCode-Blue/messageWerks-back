const appRoot = require("app-root-path");

const jsonTemplates = require(appRoot +
  "/src/v1/config/responseTemplates.json");
/**
 * Custom JSON response object
 * @typedef {object} responseTemplate
 * @property {string} status - HTTP status code
 * @property {string} message - Success / Error message
 * @property {object} data - Data returned from query
 * @property {object} result - Any additional data
 */

/**
 * @description Generates a response to an async request
 * 
 * @module
 * @name jsonResponse
 * 
 * @param {string} code - HTTP status code
 * @param {object} message - Success / Error message
 * @param {object} data - Data returned from query
 * @param {object} result - Any additional data
 *

 * @returns {responseTemplate} response - JSON object based on HTTP status code
 */
const createJsonResponse = (code, message = "", data = {}, result = {}) => {
  let response = jsonTemplates[code];
  response.message = message;
  response.data = data;
  response.result = result;

  return response;
};

module.exports = createJsonResponse;
