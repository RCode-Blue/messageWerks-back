const Contact = require("../../db/models/Contact");
const createFetchResponse = require("../v1/createFetchResponse");

/**
 * @description Gets all Contacts
 *
 * @module
 * @name fetchAllContacts
 *
 * @requires createFetchResponse
 *
 * @returns {object} undefined - Array of User objects
 */

const fetchAllContacts = async () => {
  let result;

  const filter = {};
  const projection = ["dob", "name", "email", "address", "social_media"];
  const options = { sort: { email: 1 } };

  const callback = (err, docs) => {
    result = createFetchResponse(err, docs);
  };

  await Contact.find(filter, projection, options, callback);

  // console.log(res);
  // console.log(typeof res);
  // console.log(res.length);
  // if (res.length >= 0) {
  //   console.log("yes");
  // }

  return result;
};

module.exports = fetchAllContacts;
