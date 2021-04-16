const hash = require("../password/hash");

const bcrypt = require("bcrypt");
const findUser = require("./searchUser");
const jsonResponse = require("../createJsonResponse");

const editPassword = async (id, passwords, reset_code) => {
  const { new_password_1, new_password_2 } = passwords;
  const foundUser = (await findUser.byUserId(id)).docs;

  if (new_password_1 != new_password_2) {
    return jsonResponse("400", "Passwords don't match");
  }

  // Change password
  if (passwords.current_password) {
    const { current_password } = passwords;
    const passwordHash = await hash(new_password_1);

    const isMatch = await bcrypt.compare(current_password, foundUser.password);

    if (!isMatch) {
      return jsonResponse("400", "Original password incorrect");
    }

    try {
      foundUser.password = passwordHash;
      await foundUser.save();
      return jsonResponse("200", "Successfully updated password", foundUser);
    } catch (err) {
      console.log(err);
      return jsonResponse("500", "Error saving changes", err);
    }
  }

  // Reset password
  const passwordHash = await hash(new_password_1);

  try {
    foundUser.password = passwordHash;
    foundUser.reset_code = null;
    await foundUser.save();
    return jsonResponse("200", "Successfully reset password", foundUser);
  } catch (err) {
    return jsonResponse("500", "Error saving changes", err);
  }
};

module.exports = editPassword;
