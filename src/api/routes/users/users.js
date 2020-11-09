/**
 * Express router for user route operations
 * @module routes/users
 * @requires express
 */
const express = require("express");
const router = express.Router();
const {
  body,
  check,
  checkSchema,
  validationResult,
} = require("express-validator");

const UserModel = require("../../../db/models/User");
const {
  checkUserRegistration,
} = require("../../../services/routes/users/checkUserRegistration");
const addUser = require("../../../services/routes/users/addUser");

/**
 * Route for getting users
 * @name get/
 * @function
 * @param {string} path - Express path
 */
router.get("/", (req, res) => res.send("User route"));

/**
 * @description Route for creating a new user
 * @name post/
 * @function
 * @param {string} path - Express path
 * @param {Object} req - User details
 * @borrows checkUserRegistration as checkUserRegistration
 * @borrows addUser as addUser
 * @returns {string} - New user ID
 * @throws {Object} - Error if:<ul> <li>submitted user details do not fulfill requirements</li><li>an existing user already exists</li><li>there is a problem saving to database</li></ul>
 */
router.post("/register", checkUserRegistration(), async (req, res) => {
  const { name, address, gender, dob, email, password } = req.body;

  // Check for validation error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check if user exists
    let user = await UserModel.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "user already exists" }] });
    }

    // Create user
    user = await addUser(req);
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }

  res.status(200).send("User registered!");
  // res.status(200).json({ user });
});

module.exports = router;
