const jwt = require("jsonwebtoken");

const authorise = (secret, accessToken) => {
  // console.log(token);
  let result = { error: null, user: null };

  // If no token
  if (!accessToken) {
    result.error = {
      status: "401",
      msg: "No token. Authorisation denied",
    };
    return result;
  }

  // Verify taken
  try {
    const decoded = jwt.verify(accessToken, secret);

    result.user = decoded.user;
  } catch (err) {
    result.error = {
      status: "401",
      msg: "Invalid token",
    };
  }
  return result;
};
module.exports = authorise;
