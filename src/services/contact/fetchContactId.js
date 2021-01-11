// Checks for contact info.
// Returns either contact id io null

const Contact = require("../../db/models/Contact");

const searchContact = require("./searchContact");

const fetchContactId = async (data) => {
  const { findContactByEmail } = searchContact;
  let foundContact;

  // No ID by default
  let id = null;

  // If Contact ID exists
  if (data.contact_id) {
    try {
      foundContact = await Contact.findById(data.contact_id);
    } catch (err) {
      console.error(err);
    }

    if (foundContact) {
      return foundContact.id;
    }
  }

  // If Contact email exists, get the ID
  if (data.contact_email) {
    let result;
    try {
      result = await findContactByEmail(data.contact_email);
    } catch (err) {
      console.error(err);
    }
    id = result.err ? null : result.docs[0]._id;
  }

  return id;
};

module.exports = fetchContactId;
