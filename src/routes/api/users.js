/**
 * @description Express router for user route operations
 * @name api/users
 * @module routes/users
 * @requires express
 * @requires express-validator
 * @requires jsonwebtoken
 * @requires checkUserRegistration
 * @requires createUser
 * @requires User
 * @borrows createUser
 * @borrows checkUserRegistration
 * @returns {string} - user Token
 */
const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../../db/models/User");
const {
  checkUserRegistration,
} = require("../../services/users/checkUserRegistration");
const createUser = require("../../services/users/createUser");

/**
 * Route for getting users
 * @name get/
 * @function
 * @param {string} path - Express path
 */
router.get("/", (req, res) => res.send("User route"));

/**
 * @description Route for creating a new user. <br/>Checks if user email already exists, and creates one if not
 * @name post/
 * @function
 * @async
 * @param {string} path - Express path
 * @param {Object} req - User details
 * @borrows checkUserRegistration as checkUserRegistration
 * @borrows createUser as createUser
 * @returns {string} - New user ID
 * @throws {Object} - Error if:<ul> <li>submitted user details do not fulfill requirements</li><li>an existing user already exists</li><li>there is a problem saving to database</li></ul>
 */
router.post("/register", checkUserRegistration(), async (req, res) => {
  const { email } = req.body;

  // Check for validation error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "user already exists" }] });
    }

    // Create user
    user = await createUser(req);

    // Generate token
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
