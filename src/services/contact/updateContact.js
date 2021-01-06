const Contact = require("../../db/models/Contact");

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

  await Contact.findOneAndUpdate(filter, data, options, callback);
  return result;
};

module.exports = updateContact;
