const Contact = require("../../../db/models/v1/Contact");
const createQueryResponse = require("../createQueryResponse");

const removeContact = async (id) => {
  // let result = {};

  try {
    const result = await Contact.findByIdAndDelete(id);
    return createQueryResponse.deleteResponse(false, result, null);
  } catch (err) {
    return createQueryResponse.deleteResponse(true, null, err);
  }
  // return result;
};

module.exports = removeContact;
