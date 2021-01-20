const Contact = require("../../db/models/Contact");

const updateContactField = async (id, data) => {
  let result = {};
  const options = {
    new: true,
  };

  await Contact.findOneAndUpdate(
    { _id: id },
    data,
    options,
    function (err, docs) {
      result.err = err;
      result.docs = docs;
    }
  );
  // result.result = updateResult;
  console.log(result);
  return result;
};
module.exports = updateContactField;
