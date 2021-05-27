const jsonResponse = require("./authorise");
const redisUtils = require("./redisUtils");
// const searchUser = require("../../services/user/searchUser")

const renewAccessToken = (email) => {
  let result = {
    status: null,
    msg: null,
    refreshToken: null,
  };

  const refreshToken = redisUtils.getRefreshToken(email);
  if (!refreshToken) {
    result.status = "404";
    result.msg = "Refresh token not found";
  } else {
    (result.status = "200"), (result.rerfreshToken = refreshToken);
  }
  return result;
};
module.exports = renewAccessToken;
