const bcrypt = require("bcrypt");

const findUser = require("../../controllers/user/findUser");
const jsonResponse = require("../../../helpers/jsonResponse");
const redisUtils = require("../../../helpers/auth/redisUtils");
const tokenUtils = require("../../../helpers/auth/tokenUtils");

const loginUser = async (data) => {
  const { email, password } = data;
  let response;

  const result = await findUser.byEmail(email);
  const foundUser = result.data.dataValues;
  const isMatch = bcrypt.compareSync(password, foundUser.password);

  if (!isMatch) {
    response = jsonResponse(401, "Login failed");
    return response;
  }

  const accessTokenParams = {
    user: foundUser,
    type: "access",
  };

  const refreshTokenParams = {
    user: foundUser,
    type: "refresh",
  };

  const sessionData = tokenUtils.generateToken(accessTokenParams);
  const refreshData = tokenUtils.generateToken(refreshTokenParams);
  response = jsonResponse(200, "", sessionData);
  await redisUtils.setRefreshToken(refreshData);
  return response;
};

module.exports = loginUser;
