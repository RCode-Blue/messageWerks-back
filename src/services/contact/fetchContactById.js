const Contact = require("../../db/models/Contact");
const jsonResponse = require("../../services/createJsonResponse");

const fetchContactById = async (id) => {
  let response;

  try {
    let contact = await Contact.findById(id);
    if (!contact) {
      response = jsonResponse("404", "Contact not found");
    } else {
      response = jsonResponse("200", "Success", contact);
    }
  } catch (err) {
    response = jsonResponse("400", "Server error", err);
  }

  return response;
};

module.exports = fetchContactById;
