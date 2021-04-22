const jsonResponse = require("../../v1/createJsonResponse");
const tokenUtils = require("./tokenUtils");
const preLoginChecks = require("./preLoginChecks");
const redisUtils = require("./redisUtils");

const findUser = require("../../user/searchUser");

const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

/*
Expects:
data={
  email: <email>,
  password: <password>
}
*/
const loginUser = async (data, client) => {
  // console.log(data, client);
  let accessToken;
  let refreshToken;
  const { email, password } = data;
  let result = {
    statusCode: null,
    statusMessage: null,
    accessToken: null,
  };

  const foundUser = await findUser.byContactEmail(email);

  // #region Pre-login checks *****
  let checkResult = await preLoginChecks(email, password, foundUser);
  // User not found
  if (checkResult.userNotFound) {
    result.statusCode = "404";
    result.statusMessage = "User not found";
  }
  // Max wong passwords exceeded
  if (checkResult.maxedOut) {
    result.statusCode = "400";
    result.statusMessage = "Maximum login attempts exceeded";
  }
  // Account inactive
  if (!checkResult.status) {
    result.statusCode = "403";
    result.statusMessage = "Account is not active";
  }
  if (result.statusCode) {
    return result;
  }
  // #endregion

  // #region Password check
  const isMatch = await bcrypt.compare(password, foundUser.password);
  if (!isMatch) {
    foundUser.failed_logins++;
    await foundUser.save();
    // result.noMatch = true;
    // return result;
    (result.statusCode = "401"), (result.statusMessage = "Login failure");
    return result;
  }
  // #endregion

  // #region Token checks and generation *****
  let getRefreshToken = redisUtils.getRefreshToken(email, client);
  // console.log("-----");
  // console.log(getRefreshToken);
  // let refreshToken;
  if (!getRefreshToken) {
    // generate new refresh token
    refreshToken = tokenUtils.generateToken({
      email,
      tokenData: { type: "refresh" },
    });
  } else {
    refreshToken = getRefreshToken.tokenData.refreshToken.token;
  }

  redisUtils.setRefreshToken(email, refreshToken, client);

  getAccessToken = tokenUtils.generateToken({
    email,
    tokenData: {
      type: "access",
      refreshToken: refreshToken,
    },
  });

  if (getAccessToken.err) {
    (result.statusCode = 400),
      (result.statusMessage = "Refresh token not valid");
    // return result
  } else {
    accessToken = getAccessToken.token;
    result.statusCode = 200;
    result.statusMessage = "Token generated successfully";
    result.token = accessToken;
  }
  return result;
  // #endregion
};
module.exports = loginUser;
