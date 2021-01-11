const Contact = require("../../db/models/Contact");

const fetchAllContacts = async () => {
  const result = {};

  const filter = {};
  const projection = ["dob", "name", "email", "address", "social_media"];
  const options = { sort: { email: 1 } };
  const callback = (err, docs) => {
    result.err = err;
    result.docs = docs;
  };

  await Contact.find(filter, projection, options, callback);

  return result;
};

module.exports = fetchAllContacts;
