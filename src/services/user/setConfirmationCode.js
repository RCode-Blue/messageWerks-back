const uuid = require("uuid");

const hash = require("../password/hash");
const findUser = require("./searchUser");
const jsonResponse = require("../v1/createJsonResponse");

const setCode = async (email) => {
  const { v4 } = uuid;

  const foundUser = await findUser.byContactEmail(email);
  if (foundUser.err) {
    response = jsonResponse("404", "User not found");
    return response;
  }

  const confirmation_code = v4();
  const confirmation_hash = await hash(confirmation_code);

  try {
    foundUser.confirmation_code = confirmation_hash;
    foundUser.status = "7";
    await foundUser.save();
    response = jsonResponse(
      "200",
      "Successfully saved password confirmation code",
      {
        confirmation_code,
      }
    );
  } catch (err) {
    response = jsonResponse(
      "500",
      "Error saving password confirmation code",
      err
    );
  }
};

module.exports = setCode;
