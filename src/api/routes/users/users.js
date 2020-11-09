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
 * @returns {string} - New user ID
 */
router.post("/register", checkUserRegistration(), async (req, res) => {
  const { name, address, gender, dob, email, password } = req.body;

  // Check for validation error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check if user exists
    let user = await UserModel.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "user already exists" }] });
    }

    // Create new user
    user = new UserModel({
      name: {
        firstname: name.firstname,
        familyname: name.familyname,
      },
      address: {
        addressline1: address.addressline1,
        addressline2: address.addressline2,
        state: address.state,
        country: address.country,
      },
      gender,
      dob,
      email,
      password,
    });

    // await user.save();
    console.log(user);

    const payload = {
      user: {
        id: user.id,
      },
    };
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }

  // console.log(user);
});

module.exports = router;
