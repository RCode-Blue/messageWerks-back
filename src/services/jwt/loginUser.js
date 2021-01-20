const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const appValues = require("../../config/appValues.json");
const findUser = require("../user/searchUser");

const loginUser = async (email, password) => {
  const { token } = appValues;
  const key = process.env.JWT_SECRET;
  let result = { isMatch: null, jwt: { token: null, err: null } };

  // Get User
  const user = await findUser.byContactEmail(email);

  const isMatch = await bcrypt.compare(password, user.password);
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
  } catch (err) {
    result.jwt.err = err;
  }

  return result;
};

module.exports = loginUser;
