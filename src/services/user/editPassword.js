const encrypt = require("../password/encrypt");
const findUser = require("../user/findUser");
const jsonResponse = require("../createJsonResponse");

const editPassword = async (id, passwords) => {
  const { new_password_1, new_password_2 } = passwords;
  const user = await findUser.byUserId(id);

  if (new_password_1 != new_password_2) {
    return jsonResponse("400", "Passwords don't match");
  }

  // Change password
  if (passwords.current_password) {
    const { current_password } = passwords;
    const encrypted = await encrypt(current_password);

    if (encrypted !== user.password) {
      return jsonResponse("400", "Original password incorrect");
    }

    try {
      user.password = encrypted;
      await user.save();
      return jsonResponse("200", "Successfully updated password", user);
    } catch (err) {
      return jsonResponse("500", "Error saving changes");
    }
  }

  // Reset password
  const encrypted = await encrypt(new_password_1);
  try {
    user.password = encrypted;
    return jsonResponse("200", "Successfully updated password", user);
  } catch (err) {
    return jsonResponse("500", "Error saving changes");
  }
};

module.exports = editPassword;
