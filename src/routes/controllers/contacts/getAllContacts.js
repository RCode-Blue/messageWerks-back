const Contact = require("../../../db/models/Contact");
const jsonResponse = require("../../../services/createJsonResponse");
const fetchAllContacts = require("../../../services/contact/fetchAllContacts");

const getAllContacts = async (req, res) => {
  let response, result;

  result = await fetchAllContacts();

  response = result.err
    ? jsonResponse("400", "Error", err)
    : (response = jsonResponse("200", "Success", result.docs));

  res.status(response.status).json(response);
};

module.exports = getAllContacts;
