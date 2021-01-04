const findUser = require("./findUser");
const encrypt = require("../encrypt");

const changePassword = async (id, password) => {
  try {
    let user = await findUser.byUserId(id);
    const encryptedPassword = await encrypt(password);
    user.password = encryptedPassword;
    await user.save();
    return user;
  } catch (err) {
    throw err;
  }
};

module.exports = changePassword;
