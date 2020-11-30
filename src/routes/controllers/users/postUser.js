/**
 * @description handles a POST request to create a new user.<br/>Checks if user email already exists, and creates one if not
 * @name postUser
 * @function
 * @async
 * @exports createUser
 * @requires User
 * @requires createUser
 * @borrows createUser
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @returns {Object} res User's token
 * @throws {Object} Error if submitted user details do not fulfill requirements
 * @throws {Object} Error if an existing user already exists
 * @throws {Object} Error if there is a problem saving to database
 */

const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const User = require("../../../db/models/User");
const createUser = require("../../../services/users/createUser");

const postUser = async (req, res) => {
  const { email } = req.body;

  // Check for validation error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check if user exists
    const findUser = async function (email) {
      await User.findOne(email);
    };
    let user = findUser({ email });

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
};

module.exports = postUser;
