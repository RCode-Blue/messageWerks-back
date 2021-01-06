const Contact = require("../../db/models/Contact");

// const mongoCallback = require("../mongoCallback");

const createContact = async (data) => {
  let result = {};

  // await Contact.create(data, callback(error, doc));
  try {
    result.doc = await Contact.create(data);
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports = createContact;
