const uuid = require("uuid");

const User = require("../../db/models/User");

const appValues = require("../../config/appValues.json");
const encrypt = require("./encrypt");
const findUser = require("../user/searchUser");
const searchContact = require("../contact/searchContact");
const jsonResponse = require("../createJsonResponse");

const setResetCode = async (email) => {
  const { v4 } = uuid;

  let foundContact = await searchContact.findContactByEmail(email);
  if (foundContact.err) {
    return jsonResponse("404", "Contact not found");
  }
  let foundUser = await findUser.byContactId(foundContact.docs[0].id);
  if (foundUser.err) {
    return jsonResponse("404", "User not found");
  }

  const reset_code = v4();
  const reset_hash = await encrypt(reset_code);

  try {
    foundUser.reset_code = reset_hash;
    await foundUser.save();
    response = jsonResponse("200", "Successfully saved user", reset_code);
  } catch (err) {
    response = jsonResponse("500", "Error saving User", err);
  }
  return response;
};

module.exports = setResetCode;
