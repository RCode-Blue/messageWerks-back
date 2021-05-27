const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const appValues = require("../../config/appValues.json");
const findUser = require("../../user/searchUser");
// const redisUtils = require("./redisUtils");
// const setResetCode = require("../password/setResetCode");
// const uuid = require("uuid")
// const uuidAPIKey = require("uuid-apikey");

const preLoginChecks = async (email, password, foundUser) => {
  const { token, user } = appValues;
  const key = process.env.JWT_PASSWORD_SECRET;
  let result = {
    userNotFound: false,
    maxedOut: false,
    status: true,
  };

  // Get User
  // const foundUser = await findUser.byContactEmail(email);

  if (!foundUser) {
    result.userNotFound = true;
    return result;
  }

  if (foundUser.failed_logins > user.maxFailedLogins) {
    result.maxedOut = true;
    foundUser.status = "2";
    await foundUser.save();
    return result;
  }

  if (foundUser.status !== 9) {
    result.status = false;
    return result;
  }

  return result;
};

module.exports = preLoginChecks;
