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

  const foundUserData = {
    role: foundUser.role,
    uuid: foundUser.uuid,
  };

  const accessTokenParams = {
    user: foundUserData,
    type: "access",
  };

  const refreshTokenParams = {
    user: foundUserData,
    type: "refresh",
  };

  const accessToken = tokenUtils.generateToken(accessTokenParams);
  const { uuid } = foundUser;
  const refreshToken = tokenUtils.generateToken(refreshTokenParams);
  response = jsonResponse(200, "", accessToken);
  await redisUtils.setRefreshToken({ project_id, uuid, refreshToken });
  return response;
};

module.exports = loginUser;
