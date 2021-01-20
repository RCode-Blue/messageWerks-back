const Contact = require("../../db/models/Contact");

const createContact = async (data) => {
  let result = {};

  try {
    result.doc = await Contact.create(data);
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports = createContact;
