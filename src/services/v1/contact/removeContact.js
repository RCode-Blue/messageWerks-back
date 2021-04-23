/**
 * @description Deletes a Contact
 *
 * @module removeContact
 *
 * @requires Contact
 * @requires createQueryResponse
 * @requires searchContacts
 *
 * @param {string} id - Contact id
 *
 * @returns {responseTemplate} Custom JSON status response
 */
const Contact = require("../../../db/models/v1/Contact");
const createQueryResponse = require("../createQueryResponse");
const searchContacts = require("./searchContacts");

const removeContact = async (id) => {
  let checkResult = await searchContacts.byId(id);
  console.log(checkResult);
  if (checkResult.status === 404) {
    return createQueryResponse.doesNotExist(true, checkResult);
  }

  try {
    const result = await Contact.findByIdAndDelete(id);
    return createQueryResponse.deleteResponse(false, result, null);
  } catch (err) {
    return createQueryResponse.deleteResponse(true, null, err);
  }
};

module.exports = removeContact;
