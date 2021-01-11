const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const User = require("../../db/models/User");
const appValues = require("../../config/appValues.json");
const findUser = require("../user/findUser");
const jsonResponse = require("../createJsonResponse");

const login = async (req, res) => {
  const { email, password } = req.body;
  const { token } = appValues;
  const key = process.env.JWT_SECRET;
  let response;

  const user = findUser.byEmail(email);
  if (!user) {
    response = jsonResponse("404", "User not found");
    return res.status(response.status).json(response);
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    response = jsonResponse("401", "Invalid credentials");
    return res.status(response.status).json(response);
  }

  const payload = {
    user: {
      id: user.id,
    },
  };
  const options = token.options;

  jwt.sign(payload, key, options, (err, token) => {
    if (err) {
      response = jsonResponse("500", "Error generating token", err);
    } else {
      response = jsonResponse("200", "Successfully generated token", token);
    }
    return res.status(response.status).json(response);
  });
};

module.exports = login;
