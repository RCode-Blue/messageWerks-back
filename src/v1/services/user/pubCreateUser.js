// const passwordReset = require("../../../routes/controllers/_old/users/passwordReset")
// const createContact = require("../contact/createContact");
// const searchContacts = require("../contact/searchContacts");
// const createJsonResponse = require("../createJsonResponse");
const User = require("../../db/models/User");
const { postResponse } = require("../createQueryResponse");

const createUser = async (userData) => {
  const { email } = userData;

  let result, response;

  // Create User
  try {
    result = await User.create(userData);

    // console.log(result);
    response = postResponse(null, result);
  } catch (err) {
    response = postResponse(true, null.err);
  }
  // console.log(response);
  return response;
};
module.exports = createUser;
