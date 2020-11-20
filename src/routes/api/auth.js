/**
 * @description Express router for login and authentication
 * @name api/auth
 * @module routes/auth
 * @requires express
 * @requires express-validator
 * @requires checkLoginFields
 * @requires login
 * @borrows checkLoginFields
 * @borrows login
 */
const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");

const login = require("../../services/auth/login");
const checkLoginFields = require("../../services/auth/checkLoginFields");

/**
 * Route for user login
 * @name post/
 * @function
 * @async
 * @param {string} path - Express path
 * @param {Object} req - User email and password
 * @returns {string} res - user token
 * @throws {Object} - Error if: <ul><li>The login field do not match criteria</li><li>There is a problem logging in</li></ul>
 */
router.post("/", checkLoginFields(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    login(req, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
