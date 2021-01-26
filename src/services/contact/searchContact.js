const Contact = require("../../db/models/Contact");
const createFetchResponse = require("../../services/createFetchResponse");

const findContactById = async (id) => {
  try {
    const contact = await Contact.findById(id);
    return createFetchResponse(null, contact);
  } catch (err) {
    return createFetchResponse(err, null);
  }
};

const findContactByEmail = async (email) => {
  // console.log(email);
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
        docs: foundContacts[0],
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
  const contact = (await findContactById(id)).docs;
  // console.log(contact);
  return contact.email;
};

module.exports = { findContactById, findContactByEmail, getEmailfromContactId };
