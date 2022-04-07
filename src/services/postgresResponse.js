const jsonTemplates = require("../config/responseTemplates.json");

const postgresResponse = (code, message = "", data = {}, result = {}) => {
  let response = jsonTemplates[code];
  response.message = message;
  response.data = data;
  response.result = result;

  return response;
};

module.exports = postgresResponse;
