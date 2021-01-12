const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const User = require("../../db/models/User");
const appValues = require("../../config/appValues.json");
const findUser = require("../user/searchUser");
const jsonResponse = require("../createJsonResponse");
// const searchUser = require("../user/searchUser");

const loginUser = async (email, password) => {
  const { token } = appValues;
  const key = process.env.JWT_SECRET;
  let result = { isMatch: null, jwt: { token: null, err: null } };

  // Get User
  const user = await findUser.byContactEmail(email);
  // console.log(user);

  const isMatch = await bcrypt.compare(password, user.password);
  // console.log("isMatch: ", isMatch);
  if (!isMatch) {
    result.noMatch = true;
    return result;
  }

  const payload = {
    user: {
      id: user.id,
    },
  };

  const options = token.options;

  try {
    result.jwt.token = jwt.sign(payload, key, options);
    // result.jwt.token = newToken;
  } catch (err) {
    result.jwt.err = err;
  }

  return result;
};

module.exports = loginUser;
