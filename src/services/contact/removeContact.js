const Contact = require("../../db/models/Contact");

const removeContact = async (id) => {
  let result = {};

  try {
    result.doc = await Contact.findByIdAndDelete(id);
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports = removeContact;
