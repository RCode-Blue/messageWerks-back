/**
 * Express router for user routes
 * @module routers/users
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
const { checkUserRegistration } = require("./checkUserRegistration");

/**
 * Route for getting users
 * @name get/
 * @function
 * @param {string} path - Express path
 */
router.get("/", (req, res) => res.send("User route"));

/**
 * Route for creating a new user
 */
router.post("/register", checkUserRegistration(), async (req, res) => {
  // console.log("<<<");
  // console.log(req.body);
  // console.log(">>>");
  // console.log(req.body.name.firstname);
  // checkUserRegistration(req);
  const { name, address, gender, dob, email, password } = req.body;

  // console.log("-- ||| --");
  // console.log(validationResult(req));
  // console.log("-- ^^^ --");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // check if user exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "user already exists" }] });
    }

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

  // await user.save();
  // console.log(user);
});

module.exports = router;
