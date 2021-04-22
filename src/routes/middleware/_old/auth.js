/**
 * @description Middleware for authentication
 *
 * @module auth
 * @returns {Object} - User object
 *
 * @requires jsonwebtoken
 *
 * @param {Object} req - Express request object: User token
 * @param {Object} res - Express response object
 * @param {Function} next - Next Express middleware / function
 *
 */
const jwt = require("jsonwebtoken");
const jsonResponse = require("../../services/v1/createJsonResponse");

module.exports = function (req, res, next) {
  let response;

  // Get token from header
  const token = req.header("x-auth-token");

  // If not token
  if (!token) {
    response = jsonResponse("401", "Login failed");
    return res.status(response.status).json(response);
  }

  // Verify token
  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        response = jsonResponse("401", "Invalid token");
        return res.status(response.status).json(response);
      } else {
        // Return user id
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error("Middleware error");
    response = jsonResponse("500", "Server error");
    res.status(response.status).json(response);
  }
};
