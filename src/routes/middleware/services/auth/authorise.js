const jwt = require("jsonwebtoken");
// const jsonResponse = require("../auth/authorise");

const authorise = (key, token) => {
  let result = { error: null, user: null };

  // If no token
  if (!token) {
    result.error = {
      status: "401",
      msg: "No token. Authrorisation denied",
    };
    return result;
  }

  // Verify taken
  try {
    const decoded = jwt.verify(token, key);

    result.user = decoded.user;
    // next();
  } catch (err) {
    result.error = {
      status: "401",
      msg: "Invalid token",
    };
  }
  return result;
};
module.exports = authorise;
