const Contact = require("../../db/models/Contact");
const createFetchResponse = require("../../services/createFetchResponse");

const byId = async (id) => {
  try {
    const contact = await Contact.findById(id);
    return createFetchResponse(null, contact);
  } catch (err) {
    return createFetchResponse(err, null);
  }
};

const byEmail = async (email) => {
  let searchResults = {};

  const filter = { email: email };
  const projection = [];
  const options = {};
  try {
    let foundContacts = await Contact.findOne(filter, projection, options);
    searchResults = {
      docs: foundContacts,
      err: false,
    };
  } catch (err) {
    searchResults = {
      docs: null,
      err: err,
    };
  }

  return searchResults;
};

const getEmailfromContactId = async (id) => {
  const contact = (await byId(id)).docs;
  // console.log(contact);
  return contact.email;
};

module.exports = { byId, byEmail, getEmailfromContactId };
