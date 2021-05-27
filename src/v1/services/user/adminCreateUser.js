// const passwordReset = require("../../../routes/controllers/_old/users/passwordReset")
const createContact = require("../contact/createContact");
const searchContacts = require("../contact/searchContacts");
const createJsonResponse = require("../createJsonResponse");

const createJsonReponse = require("../createJsonResponse");

const createUser = async (userData) => {
  const { email } = userData;

  let result, contact;

  // Check logged-in user's status and permission

  // Check if contact's email exists
  result = searchContacts.checkEmailExists(email);
  if (!result) {
    contact = createContact(email);
  } else {
    // Contact does not exist - create Contact
    contact = searchContacts.byEmail(email);
  }

  // Contact exists - check if corresponding User account exists

  // User exists - send error message

  // User doies not exist - create User
};
module.exports = createUser;
