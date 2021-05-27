const User = require("../../db/models/User");

const fetchUsers = async (filter, projection, options = {}) => {
  let result = {};
  const callback = (err, arr) => {
    result.err = err;
    result.doc = arr;
  };

  await User.find(filter, projection, options, callback);

  return result;
};

module.exports = fetchUsers;
