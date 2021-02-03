/**
 * @description Generates a response to an async request
 * @name createJsonResponse
 *
 * @function
 * @returns {object} JSON with status code and data
 *
 * @param {string} code Status code
 * @param {string} [message=""] Success / Error message
 * @param {object} [data={}] Detailed information or data
 */

const jsonTemplates = require("../config/responseTemplates.json");

const createJson = (code, message = "", data = {}, result = {}) => {
  let response = jsonTemplates[code];
  response.message = message;
  response.data = data;
  response.result = result;

  return response;
};

module.exports = createJson;
