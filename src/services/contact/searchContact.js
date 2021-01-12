const Contact = require("../../db/models/Contact");
const jsonResponse = require("../createJsonResponse");

// Assumes contact ID is valid and exists
const findContactById = async (id) => {
  const contact = await Contact.findById(id);
  return contact ? contact : null;
};

const findContactByEmail = async (email) => {
  let searchResults = {};

  const filter = { email: email };
  const projection = [];
  const options = {};
  try {
    let foundContacts = await Contact.find(filter, projection, options);
    if (foundContacts.length === 0) {
      searchResults = {
        docs: null,
        err: true,
      };
    } else {
      searchResults = {
        docs: foundContacts,
        err: false,
      };
    }
  } catch (err) {
    searchResults = {
      docs: null,
      err: err,
    };
  }

  return searchResults;
};

const getEmailfromContactId = async (id) => {
  const contact = await findContactById(id);
  return contact.email;
};

module.exports = { findContactById, findContactByEmail, getEmailfromContactId };
