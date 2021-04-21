const createContact = require("../../../services/v1/contact/createContact");
const jsonResponse = require("../../../services/v1/createJsonResponse");
const searchContact = require("../../../services/v1/contact/searchContact");

const checkContact = async (req, res) => {
  let response;
  let result = await searchContact.findContactByEmail(email);
  if (result.err) {
    response = jsonResponse("400", "Error searching for Contact", result.err);
  } else if (!result.err && !result.docs) {
    response = jsonResponse("404", "Contact not found");
  } else {
    response = jsonResponse("200", "Contact found", result.docs[0]);
  }

  return res.status(response.status).json(response);
};

const newContact = async (email) => {
  let response;
  let result = await createContact(email);
  if (result.err) {
    response = jsonResponse("400", "Error creating Contact", result.err);
  } else {
    response = jsonResponse(
      "200",
      "Successfully created Contact",
      response.doc
    );
  }
  return res.status(response.status).json(response);
};

module.exports = { checkContact, newContact };
