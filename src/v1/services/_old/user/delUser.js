const User = require("../../db/models/User");

const delUser = async (id) => {
  let result = {};
  const options = {};
  const callback = async (err, docs) => {
    if (err) {
      result.error = err;
      result.code = "500";
    }
    if (docs) {
      result.docs = docs;
      result.code = "200";
    }
  };

  await User.findByIdAndDelete(id, options, callback);
  return result;
};
module.exports = delUser;
