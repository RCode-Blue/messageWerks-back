const User = require("../../db/models/User");
const searchContact = require("../contact/searchContact");

const projection = [];
const options = {
  populate: "contact",
};

let searchResults = {
  docs: null, // array or object
  err: null, // boolean
};

// Find by contact email
const byContactEmail = async (email) => {
  let foundContact = await searchContact.byEmail(email);

  if (foundContact.err || !foundContact.docs) {
    searchResults.err = true;
    return searchResults;
  }
  let contactId = foundContact.docs.id;
  return (await byContactId(contactId)).docs;
};

// Find by user id
const byUserId = async (id) => {
  try {
    let foundUser = await User.findById(id, projection, options);
    if (foundUser.length === 0) {
      searchResults.err = true;
    } else {
      searchResults.docs = foundUser;
    }
  } catch (err) {
    searchResults.err = err;
  }
  return searchResults;
};

// Find by contact id
const byContactId = async (id) => {
  let filter = { contact: id };
  try {
    let foundUser = await User.findOne(filter, projection, options);
    if (!foundUser) {
      searchResults.err = false;
    } else {
      searchResults.docs = foundUser;
    }
  } catch (err) {
    searchResults.err = err;
  }
  return searchResults;
};

module.exports = { byUserId, byContactId, byContactEmail };
