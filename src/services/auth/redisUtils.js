const appValues = require("../../config/appValues.json");
// const redisClient = require("../../config/scripts/redis");

const projectCode = appValues.project.code;
// const accessTokenExpiry = appValues.token.access_token.expires_in_secs;
const refreshTokenExpiry = appValues.token.refresh.expires_in_secs;

const setRefreshToken = (email, refreshToken, redisClient) => {
  const key = projectCode + email;
  return redisClient.set(key, refreshToken, "EX", refreshTokenExpiry); // returns "OK" if successful, err if not
};

const getRefreshToken = (email, redisClient) => {
  // console.log(client);
  // let redisClient = client;
  const key = projectCode + email;
  let clientRefreshToken = redisClient.get(key);
  // console.log(clientRefreshToken);
  return clientRefreshToken ? clientRefreshToken : null;
};

// const checkTokenValidity = () => {
//   Date.now() >= refreshTokenExpiry;
// };

module.exports = { setRefreshToken, getRefreshToken };
