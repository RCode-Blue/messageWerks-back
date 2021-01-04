/**
 * @description Express router for login and authentication
 *
 * @module routes/api/auth
 * @async
 *
 * @requires express
 * @requires express-validator
 *
 * @requires checkLoginFields
 * @requires login
 * @borrows checkLoginFields
 * @borrows login
 *
 * @param {object} req
 * @param {object} res
 */
const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");

const login = require("../../services/auth/login");
const checkLoginFields = require("../../services/auth/checkLoginFields");
const jsonResponse = require("../../services/createJsonResponse");

/**
 * Route for user login
 * @name post/
 * @function
 * @async
 * @param {string} path - Express path
 * @param {object} req - User email and password
 * @returns {string} res - user token
 * @throws {object} - Error if the login field do not match criteria
 * @throws {object} Error if there is a problem logging in
 */
router.post("/", checkLoginFields(), async (req, res) => {
  const errors = validationResult(req);

  let response;

  if (!errors.isEmpty()) {
    response = jsonResponse("_400", "error", { errors: errors.array() });
    return res.status(response.status).json(response);
  }
  try {
    login(req, res);
  } catch (err) {
    console.error(err.message);
    response = jsonResponse("_500", "Server error", err);
    res.status(response.status).json(response);
  }
});

module.exports = router;
