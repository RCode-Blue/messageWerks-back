const jsonResponse = require("../createJsonResponse");
const searchUser = require("./searchUser");
const bcrypt = require("bcrypt");

// const User = require("../../db/models/User")

const confirmUser = async (email, confirmation_code) => {
  let response;

  let searchResult = searchUser.byContactEmail(email);
  if (searchResult.err) {
    response = jsonResponse("400", "Error finding user", {
      err: searchResult.err,
    });
    return response;
  }
  if (!searchResult.docs) {
    response = jsonResponse("404", "User not found");
    return response;
  }

  let foundUser = searchResult.docs;
  const isMatch = await bcrypt.compare(
    confirmation_code,
    foundUser.confirmation_code
  );
  if (!isMatch) {
    response = jsonResponse("400", "Code mismatch");
    return response;
  }

  foundUser.confirmation_code = null;
  foundUser.status = "9";
  try {
    await foundUser.save();
    response = jsonResponse("200", "User confirmed successfully");
  } catch (err) {
    response = jsonResponse("400", "Error confirming user", { err });
  }
  return response;
};

module.exports = confirmUser;
