const Contact = require("../../../db/models/v1/Contact");
const createQueryResponse = require("../createQueryResponse");

const createContact = async (data) => {
  try {
    result = await Contact.create(data);
    return createQueryResponse.postResponse(null, result);
  } catch (err) {
    return createQueryResponse.postResponse(true, null, err);
  }
};

module.exports = createContact;