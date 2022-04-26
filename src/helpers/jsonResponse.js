/**
 * @description Returns a standardised JSON response based on a template
 *
 * @module
 * @name jsonResponse
 */
/**
 * @typedef jsonResponse
 * @property {integer} code - HTTP response status code
 * @property {string} message - Description of the HTTP response code
 * @property {object} data - Data returned by callback
 * @property {object} result - Additional information, eg: error message
 */

const jsonTemplates = require("../config/responseTemplates.json");

const jsonResponse = (code, message = "", data = {}, result = {}) => {
  let response = jsonTemplates[code];
  response.message = message;
  response.data = data;
  response.result = result;

  return response;
};

module.exports = jsonResponse;
