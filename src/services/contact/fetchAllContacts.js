const Contact = require("../../db/models/Contact");
const createFetchResponse = require("../createFetchResponse");

const fetchAllContacts = async () => {
  let result;

  const filter = {};
  const projection = ["dob", "name", "email", "address", "social_media"];
  const options = { sort: { email: 1 } };

  const callback = (err, docs) => {
    result = createFetchResponse(err, docs);
  };

  await Contact.find(filter, projection, options, callback);

  return result;
};

module.exports = fetchAllContacts;
