const User = require("../../db/models/User");
const codeUtils = require("../codeUtils");
const createHash = require("../password/hash");

const createUser = async (userData) => {
  const { password, acl_role, status, contact_id } = userData;
  let result = { err: null, doc: null };

  const passwordHash = await createHash(password);

  let item_ref =
    userData.contact_id.replace(/[^a-zA-Z0-9]/g, "").substring(0, 4) +
    Math.floor(Math.random() * 10000 + 1).toString();

  let data = {
    password: passwordHash,
    acl_role,
    item_ref,
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
