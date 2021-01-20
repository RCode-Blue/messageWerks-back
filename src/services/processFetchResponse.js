const jsonResponse = require("./createJsonResponse");

const processFetchResponse = (result) => {
  let response;

  if (result.err) {
    response = jsonResponse("400", "Server error", result.err);
  } else if (!result.docs) {
    response = jsonResponse("404", "Contact not found");
  } else {
    response = jsonResponse("200", "Success", result.docs);
  }

  return response;
};

module.exports = processFetchResponse;
