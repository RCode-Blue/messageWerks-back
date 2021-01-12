const bcrypt = require("bcrypt");

const appValues = require("../../config/appValues.json");
const encrypt = require("../password/encrypt");
const findUser = require("../user/searchUser");
const jsonResponse = require("../createJsonResponse");
const searchContact = require("../contact/searchContact");

const { user } = appValues;

const resetPassword = async (email, reset_code, passwords) => {
  let response;
  let searchResults = {
    err: null,
    docs: null,
  };
  const { new_password_1, new_password_2 } = passwords;

  // Check that passwords match
  if (new_password_1 !== new_password_2) {
    response = jsonResponse("400", "New passwords don't match");
    return response;
  }

  //check password length
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
  if (searchContactsResults.err) {
    response = jsonResponse("400", "Contact not found");
    return response;
  }
  let foundContact = searchContactsResults.docs[0];

  let searchUserResults = await findUser.byContactId(foundContact.id);
  // console.log(searchUserResults);
  if (searchUserResults.err) {
    // Contact not attached to a user
    // console.log("No user");
    response = jsonResponse("404", "User not found");
    return response;
  }
  let foundUser = searchUserResults.docs;
  // console.log(foundUser);

  // Check reset code
  const isMatch = await bcrypt.compare(reset_code, foundUser.reset_code);
  if (!isMatch) {
    response = jsonResponse("400", "Reset code mismatch");
    return response;
  }

  // Check email
  if (email !== foundContact.email) {
    response = jsonResponse("400", "Email not found");
    return response;
  }

  // reset password
  const encrypted = await encrypt(new_password_1);
  try {
    foundUser.password = encrypted;
    foundUser.reset_code = null;
    let saved = await foundUser.save();
    response = jsonResponse("200", "Successfully reset password", saved);
  } catch (err) {
    response = jsonResponse("500", "Error saving changes", err);
  }
  return response;
};

module.exports = resetPassword;
