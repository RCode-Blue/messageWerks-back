/**
 * @description Performs user login<br/>Matches form data with password, and generates a user token
 * @function login
 * @returns {Object} - User token
 *
 * @requires bcrypt
 * @requires jsonwebtoken
 *
 * @param {object} req - Email and password
 * @throws {object} Error if user does not exist
 * @throws {object} Error if wrong password
 *
 */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../db/models/User");
const appValues = require("../../config/appValues.json");

const login = async (req, res) => {
  const { email, password } = req.body;
  const errorMsg = "Invalid Credentials";

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ errors: [{ msg: errorMsg }] });
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ errors: [{ msg: errorMsg }] });
  }

  const payload = {
    user: {
      id: user.id,
    },
  };
  const key = process.env.JWT_SECRET;
  const options = appValues.token.options;

  jwt.sign(payload, key, options, (err, token) => {
    if (err) throw err;
    res.json({ token });
  });
  // } catch (err) {
  //   console.error(err.message);
  //   res.status(500).send("Server error");
  // }
};

module.exports = login;
