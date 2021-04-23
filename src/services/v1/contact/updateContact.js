/**
 * @description Updates a Contact
 *
 * @module
 * @name updateContact
 *
 * @requires Contact
 * @requires createQueryResponse
 * @requires searchContacts
 *
 * @param {object} data - Contact data
 * @param {object} data.dob
 * @param {object} data.address
 * @param {object} data.name
 * @param {object} data.social_media
 * @param {object} id - Contact id
 */

const Contact = require("../../../db/models/v1/Contact");
const createQueryResponse = require("../createQueryResponse");
const searchContacts = require("./searchContacts");

const updateContact = async (data, id) => {
  let result = {};

  const filter = { _id: id };
  const options = {
    new: true,
    upsert: false,
    omitUndefined: true,
    overwrite: true,
  };
  const callback = (err, doc) => {
    result.err = err;
    result.doc = doc;
  };

  if (!(await searchContacts.checkIdExists(id))) {
    return createQueryResponse.doesNotExist(true);
  }

  await Contact.findOneAndUpdate(filter, data, options, callback);
  if (!result.err) {
    return createQueryResponse.updateResponse(false, result.doc);
  }
  return createQueryResponse.updateResponse(true, null, result.err);
};

module.exports = updateContact;
