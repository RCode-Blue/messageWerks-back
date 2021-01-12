const jwt = require("jwt");
const jsonResponse = require("../auth/authorise");

const authorise = (key, token) => {
  const key = process.env.JWT_SECRET;
  const token = req.header("x-auth-token");
  let result = { error: null, user: null };

  // if no token
  if (!token) {
    result.error = {
      status: "401",
      msg: "To token. Authrorisation denied",
    };
    return result;
  }

  // verify taken
  try {
    const decoded = jwt.verify(token, key);

    result.user = decoded.user;
    next();
  } catch (err) {
    result.error = {
      status: "401",
      msg: "Invalid token",
    };
  }
};
module.exports = authorise;
