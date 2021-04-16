// Checks for contact info.
// Returns either contact id io null

const Contact = require("../../db/models/Contact");

const searchContact = require("./searchContact");

const fetchContactId = async (data) => {
  let foundContact;
  let result = {
    contact: null,
    err: null,
  };

  // If Contact ID exists
  if (data.contact_id) {
    try {
      foundContact = await Contact.byId(data.contact_id);
    } catch (err) {
      result.err = err;
    }

    if (foundContact) {
      result.contact = foundContact;
    }
  }

  // If Contact email exists, get the ID
  if (data.contact_email) {
    foundContact = await searchContact.byEmail(data.contact_email);
    if (foundContact.err || !foundContact.docs) {
      result.err = foundContact.err;
    } else {
      result.contact = foundContact.docs;
    }
  }

  return result;
};

module.exports = fetchContactId;
