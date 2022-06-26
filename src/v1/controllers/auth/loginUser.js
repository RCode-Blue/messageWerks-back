const bcrypt = require("bcrypt");

const findUser = require("../../controllers/user/findUser");
const jsonResponse = require("../../../helpers/jsonResponse");
const redisUtils = require("../../../helpers/auth/redisUtils");
const tokenUtils = require("../../../helpers/auth/tokenUtils");
const appSettings = require("../../../config/appSettings.json");

const loginUser = async (data) => {
  const { email, password } = data;
  const project_id = appSettings.project.project_id;
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

  const accessToken = tokenUtils.generateToken(accessTokenParams);
  const refreshToken = tokenUtils.generateToken(refreshTokenParams);
  response = jsonResponse(200, "", accessToken);
  // console.log("");
  // console.log("---------------");
  // console.log(accessToken);
  // console.log("---------------");
  // console.log("");
  await redisUtils.setRefreshToken({ project_id, accessToken, refreshToken });
  return response;
};

module.exports = loginUser;
