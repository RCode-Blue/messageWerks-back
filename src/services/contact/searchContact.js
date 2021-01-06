const Contact = require("../../db/models/Contact");
const jsonResponse = require("../createJsonResponse");

const findContactById = async (id) => {
  const contact = await Contact.findById(id);
  return contact ? contact : null;
};

const findContactByEmail = async (email) => {
  const searchResults = {};

  const filter = { email };
  const columns = ["email"];
  const options = {
    sort: {
      email: 1,
    },
    limit: 10,
  };
  const callback = (err, docs) => {
    searchResults.err = err;
    searchResults.docs = docs;
  };
  await Contact.find(filter, columns, options, callback);
  return searchResults;
};

const getEmailfromContactId = async (id) => {
  const contact = await findContactById(id);
  // console.log(contact);
  return contact.email;
};

module.exports = { findContactById, findContactByEmail, getEmailfromContactId };
