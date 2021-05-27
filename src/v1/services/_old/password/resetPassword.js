const bcrypt = require("bcrypt");

const appValues = require("../../config/appValues.json");
const hash = require("./hash");
const findUser = require("../user/searchUser");
const jsonResponse = require("../v1/createJsonResponse");
const searchContact = require("../v1/contact/searchContacts");
// const { result } = require("validate.js");

const { user } = appValues;

const resetPassword = async (email, reset_code, passwords) => {
  let response;
  let result = {
    code: null,
    msesage: null,
    err: null,
    docs: null,
  };
  const { new_password_1, new_password_2 } = passwords;

  // Check that passwords match
  if (new_password_1 !== new_password_2) {
    // result.code = "400";
    // result.message = "New passwords don't match";
    response = jsonResponse("400", "New passwords don't match");
    return response;
  }

  // Check password length
  if (new_password_1.length < 8) {
    pwdLength = user.minPasswordLength;

    response = jsonResponse(
      "400",
      `Passwords must be at least ${pwdLength} characters long`
    );
    return response;
  }

  // Get Contact id from email
  let searchContactsResults = await searchContact.findContactByEmail(email);
  // console.log(searchContactsResults);
  if (searchContactsResults.err || !searchContactsResults.docs) {
    // result.code = "400";
    // result.message = "Contact not found";
    response = jsonResponse("400", "Contact not found");
    return response;
  }
  let foundContact = searchContactsResults.docs;
  // console.log(foundContact);

  let searchUserResults = await findUser.byContactId(foundContact.id);
  // console.log(searchUserResults);
  if (searchUserResults.err) {
    // Contact not attached to a user
    // result.code = "400";
    // result.message = "User not found";

    response = jsonResponse("400", "User not found");
    return response;
  }
  let foundUser = searchUserResults.docs;

  // Check email
  if (email !== foundContact.email) {
    // result.code = "400";
    // result.message = "Email not found";
    response = jsonResponse("400", "Email not found");
    return response;
  }

  const encrypted = await hash(new_password_1);
  if (!foundUser.reset_code) {
    response = jsonResponse("400", "No reset code");
    return response;
  }

  // Check reset code
  const isMatch = await bcrypt.compare(reset_code, foundUser.reset_code);
  if (!isMatch) {
    response = jsonResponse("400", "Reset code mismatch");
    return response;
  }

  // Reset password

  try {
    foundUser.password = encrypted;
    foundUser.reset_code = null;
    foundUser.status = "9";
    foundUser.failed_logins = 0;
    let saved = await foundUser.save();
    response = jsonResponse("200", "Successfully reset password", saved);
  } catch (err) {
    response = jsonResponse("500", "Error saving changes", err);
  }
  return response;
};

module.exports = resetPassword;
