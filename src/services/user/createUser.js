const User = require("../../db/models/User");

const createUser = async (data) => {
  let result = {};
  const callback = (err, doc) => {
    result.err = err;
    result.doc = doc;
  };

  await User.create(data, callback);
};
module.exports = createUser;
