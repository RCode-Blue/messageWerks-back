/**
 * @description Performs user login<br/>Matches form data with password, and generates a user token
 * @name login
 * @exports login
 * @requires bcrypt
 * @requires jsonwebtoken
 * @param {Object} req - Email and password
 * @throws {Object} - Error if: <ul><li>User does not exist</li><li>Wrong password</li></ul>
 * @returns {Object} - User token
 */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../db/models/User");

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

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: "5 days" },
    (err, token) => {
      if (err) throw err;
      res.json({ token });
    }
  );
  // } catch (err) {
  //   console.error(err.message);
  //   res.status(500).send("Server error");
  // }
};

module.exports = login;
