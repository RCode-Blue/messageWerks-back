/**
 * @description Creates a Contact
 *
 * @module
 * @name createContact
 *
 * @requires Contact
 * @requires createQueryResponse
 *
 * @param {Contact} data - Contact
 *
 * @returns {responseTemplate} Custom JSON status response
 */
const Contact = require("../../db/models/Contact");
const createQueryResponse = require("../createQueryResponse");

const createContact = async (data) => {
  console.log(data);
  try {
    result = await Contact.create(data);
    return createQueryResponse.postResponse(null, result);
  } catch (err) {
    console.log(err);
    return createQueryResponse.postResponse(true, null, err);
  }
};

module.exports = createContact;
