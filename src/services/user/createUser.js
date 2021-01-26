const User = require("../../db/models/User");
const encrypt = require("../password/encrypt");

const createUser = async (userData) => {
  const { password, acl_role, status, contact_id } = userData;
  let result = {};

  let passwordHash = await encrypt(password);

  let data = {
    password: passwordHash,
    acl_role,
    status,
    contact: contact_id,
  };

  try {
    result.doc = await User.create(data);
  } catch (err) {
    result.err = err;
  }

  return result;
};
module.exports = createUser;
