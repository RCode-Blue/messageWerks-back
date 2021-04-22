/**
 * @description Search for a Contact
 *
 * @module
 * @name searchContacts
 *
 * @requires createFetchResponse
 */

const Contact = require("../../../db/models/v1/Contact");
// const createFetchResponse = require("../createFetchResponse");
const createQueryResponse = require("../createQueryResponse");

/**
 * @description Get all contacts
 *
 * @function
 *
 * @returns {responseTemplate} undefined - Search result
 */
const all = async () => {
  let result;

  const filter = {};
  const projection = ["dob", "name", "email", "address", "social_media"];
  const options = { sort: { email: 1 } };

  const callback = (err, docs) => {
    result = createQueryResponse.getResponse(err, docs);
  };

  await Contact.find(filter, projection, options, callback);

  return result;
};

/**
 * @description Search Contact by ID
 *
 * @function
 *
 * @param {string} id - Contact's ID
 *
 * @returns {object} searchResults
 * @property {object} searchResults.err - Error message
 * @property {object} searchResults.docs - QUery result
 */
const byId = async (id) => {
  try {
    const contact = await Contact.findById(id);
    return createQueryResponse.getResponse(false, contact, null);
  } catch (err) {
    return createQueryResponse.getResponse(true, null, err);
  }
};

/**
 * @description Search Contact by contact Email
 *
 * @function
 *
 * @param {string} email - Contact's Email
 *
 * @returns {object} searchResults
 * @property {object} searchResults.err - Error message
 * @property {object} searchResults.docs - QUery result
 */
const byEmail = async (email) => {
  let searchResults = {};

  const filter = { email: email };
  const projection = [];
  const options = {};
  try {
    // let foundContacts = await Contact.findOne(filter, projection, options);
    const contact = await Contact.findOne(filter, projection, options);
    return createQueryResponse.getResponse(false, contact, null);
  } catch (err) {
    return createQueryResponse.getResponse(true, null, err);
  }
};

const checkEmailExists = async (email) => {
  let result = await byEmail(email);
  // console.log(result);
  if (result.status === 200) {
    return createQueryResponse.alreadyExists(true, result.data);
  }
  return createQueryResponse.alreadyExists(false);
};

const getEmailfromContactId = async (id) => {
  const contact = (await byId(id)).docs;
  // console.log(contact);
  return contact.email;
};

module.exports = {
  all,
  byId,
  byEmail,
  getEmailfromContactId,
  checkEmailExists,
};
