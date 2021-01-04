const Contact = require("../../db/models/Contact");

const updateContactField = async (id, data) => {
  let result = {};
  const options = {
    new: true,
  };

  let updateResult = await Contact.findOneAndUpdate(
    { _id: id },
    data,
    options,
    function (err, doc) {
      result.err = err;
      result.doc = doc;
    }
  );
  result.result = updateResult;
  return result;
};
module.exports = updateContactField;
