const uuid = require("uuid");

const encrypt = require("../password/hash");
const findUser = require("./searchUser");
const jsonResponse = require("../createJsonResponse");

const setResetCode = async (email) => {
  const { v4 } = uuid;

  const foundUser = await findUser.byContactEmail(email);

  if (foundUser.err) {
    response = jsonResponse("404", "User not found");
    return response;
  }

  const reset_code = v4();
  const reset_hash = await encrypt(reset_code);

  try {
    foundUser.reset_code = reset_hash;
    foundUser.status = "7";
    await foundUser.save();
    response = jsonResponse("200", "Successfully saved password reset code", {
      reset_code,
    });
  } catch (err) {
    response = jsonResponse("500", "Error saving password reset code", err);
  }
  return response;
};

module.exports = setResetCode;
