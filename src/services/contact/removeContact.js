const Contact = require("../../db/models/Contact");

const removeContact = async (id) => {
  let result = {};
  const conditions = { _id: id };
  const options = {};

  const callback = (err, doc) => {
    result.err = err;
    result.doc = doc;
  };

  Contact.findOneAndRemove(conditions, options, callback);
  return result;
};

module.exports = removeContact;
