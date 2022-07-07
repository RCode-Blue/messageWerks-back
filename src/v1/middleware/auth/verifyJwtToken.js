const jwt_decode = require("jwt-decode");
const jsonResponse = require("../../../helpers/jsonResponse");
const {
  generateToken,
  verifyToken,
} = require("../../../helpers/auth/tokenUtils");
const { checkRefreshToken } = require("../../../helpers/auth/redisUtils");

const verifyJwtToken = async (req, res, next) => {
  let response;

  const token = req.headers.authorization;
  response = await verifyToken(token);

  const userUuid = jwt_decode(token).uuid;
  const role = jwt_decode(token).role;

  // Access token is invalid
  if (response.status == 401) {
    // Check for refresh token
    const refreshTokenCheck = await checkRefreshToken(jwt_decode(token).uuid);

    // Refresh token exists -> generate new Access token and send it back - error 401
    if (refreshTokenCheck) {
      const accessTokenParams = {
        user: {
          role,
          uuid: userUuid,
        },
        type: "access",
      };
      const accessToken = generateToken(accessTokenParams);
      response = jsonResponse(401, "", { accessToken });
      return res.status(response.status).json(response);
    }

    // No refresh token -> return expired token error 404
    response = jsonResponse(400, "Refresh token expired");
    return res.status(response.status).json(response);
  }

  // Access token is valid
  if (response.status == 200) {
  }

  const { uuid } = response.data;

  next();
};

module.exports = verifyJwtToken;
