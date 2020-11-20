/**
 * @description Middleware for authentication
 * @module auth
 * @function
 * @param {Object} req - User token
 * @param {Function} next Next Express middleware
 * @return {Object} - User token
 */
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");
  // console.log(token);

  // If not token
  if (!token) {
    return res.status(401).json({ msg: "Login failed" });
  }

  // Verify token
  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: "Invalid token" });
      } else {
        // Return user id
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error("Middleware error");
    res.status(500).json({ msg: "Server error" });
  }
};
