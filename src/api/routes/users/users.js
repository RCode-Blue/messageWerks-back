/**
 * Express router for user route operations
 * @module routes/users
 * @requires express
 */
const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
// const jwt = require("jsonwebtoken");

const UserModel = require("../../../db/models/User");
const {
  checkUserRegistration,
} = require("../../../services/routes/users/checkUserRegistration");
const createUser = require("../../../services/routes/users/createUser");
const getToken = require("../../../scripts/token");

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
 * @async
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
    user = await createUser(req);

    // Generate token
    getToken(user);

    // const payload = {
    //   user: {
    //     id: user.id,
    //   },
    // };
    // jwt.sign(
    //   payload,
    //   process.env.JWT_SECRET,
    //   { expiresIn: 360000 },
    //   (err, token) => {
    //     if (err) throw err;
    //     res.json({ token });
    //     console.log(token);
    //   }
    // );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }

  // res.status(200).send("User registered!");
  // res.status(200).json({ user });
});

module.exports = router;
