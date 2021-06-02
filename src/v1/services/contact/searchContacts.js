/**
 * @description Search for a Contact
 *
 * @module
 * @name searchContacts
 *
 * @requires createFetchResponse
 */

const Contact = require("../../db/models/Contact");
// const createFetchResponse = require("../createFetchResponse");
const createQueryResponse = require("../createQueryResponse");

/**
 * @description Get all contacts
 *
 * @function
 *
 * @returns {responseTemplate} undefined - Search result
 */
const findAll = async () => {
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
const findById = async (id) => {
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
 * @returns {responseTemplate} searchResults
 */
const findByEmail = async (email) => {
  // console.log("email:");
  // console.log(email);
  let searchResults = {};

  const filter = { email: email };
  const projection = [];
  const options = {};
  // console.log("filter" + filter);
  try {
    // let foundContacts = await Contact.findOne(filter, projection, options);
    const contact = await Contact.findOne(filter, projection, options);
    // console.log("=== contact ===");
    // console.log(contact);
    // console.log("xxx");
    return createQueryResponse.getResponse(false, contact, null);
  } catch (err) {
    return createQueryResponse.getResponse(true, null, err);
  }
};

/**
 * @description Checks if a Contact exists
 * @function
 *
 * @param {string} id - Contact's id
 *
 * @returns {boolean} undefined
 */
const checkContactIdExists = async (id) => {
  let result = await byId(id);
  if (result.status === 200) {
    return true;
    // return createQueryResponse.doesExist(true, result.data);
  }
  return false;
  // return createQueryResponse.doesExist(false);
};

/**
 * @description Checks if a COntact exists *
 * @function
 *
 * @param {string} email - Contact's email
 *
 * @returns {object} result
 */
const checkContactEmailExists = async (email) => {
  // console.log(data);
  let result = await findByEmail(email);
  // console.log("+++ result +++");
  // console.log(result);
  // console.log("++++++");
  if (result.status === 200) {
    // return createQueryResponse.alreadyExists(true, result.data);
    return result;
    // return true;
  }
  return createQueryResponse.alreadyExists(false);
  // return false;
};

/**
 * @description Gets a contact's email from the id
 * @function
 *
 * @param {string} id - Contact id
 *
 * @returns {string} email - Contact's email
 */
const findEmailfromContactId = async (id) => {
  const contact = (await findById(id)).docs;
  // console.log(contact);
  return contact.email;
};

module.exports = {
  findAll,
  findById,
  findByEmail,
  findEmailfromContactId,
  checkContactEmailExists,
  checkContactIdExists,
};
