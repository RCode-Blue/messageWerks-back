const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const appValues = require("../../config/appValues.json");
const findUser = require("../user/searchUser");
// const setResetCode = require("../password/setResetCode");
// const uuid = require("uuid")
// const uuidAPIKey = require("uuid-apikey");

const loginUser = async (email, password) => {
  const { token, user } = appValues;
  const key = process.env.JWT_SECRET;
  let result = {
    userNotFound: false,
    noMatch: null,
    maxedOut: false,
    jwt: { token: null, err: null },
  };

  // Get User
  const foundUser = await findUser.byContactEmail(email);

  if (!foundUser) {
    result.userNotFound = true;
    return result;
  }

  if (foundUser.failed_logins >= user.maxFailedLogins) {
    result.maxedOut = true;
    foundUser.status = "2";
    await foundUser.save();
    return result;
  }

  const isMatch = await bcrypt.compare(password, foundUser.password);
  if (!isMatch) {
    foundUser.failed_logins++;
    await foundUser.save();
    result.noMatch = true;
    return result;
  }

  foundUser.failed_logins = 0;
  await foundUser.save();
  const payload = {
    user: {
      id: foundUser.id,
    },
  };

  const options = token.options;

  try {
    result.jwt.token = jwt.sign(payload, key, options);
  } catch (err) {
    result.jwt.err = err;
  }

  return result;
};

module.exports = loginUser;
