const jwt = require("jsonwebtoken");

const appValues = require("../../config/appValues.json");
const findUser = require("../../user/searchUser");

const getSecret = (type) => {
  let secret;

  switch (type) {
    case "password":
      secret = process.env.JWT_PASSWORD_SECRET;
      break;
    case "access":
      secret = process.env.JWT_ACCESS_TOKEN_SECRET;
      break;
    case "refresh":
      secret = process.env.JWT_REFRESH_TOKEN_SECRET;
      break;
  }

  return secret;
};

const getOptions = (type) => {
  const { token } = appValues;
  let options;

  switch (type) {
    case "password":
      options = token.password.options;
      break;
    case "access":
      options = token.access.options;
      break;
    case "refresh":
      options = token.refresh.options;
      break;
  }

  return options;
};

/*
Expects:
{
  email: <email>,
  tokenData: {
    type: <type>
    [refreshToken: null | <refresh_token>]
  }
}
*/
const generateToken = (data) => {
  // console.log("--*---");
  // console.log(data);
  const { email, tokenData } = data;
  const tokenType = tokenData.type;

  const { token } = appValues;
  const foundUser = findUser.byContactEmail(email);
  let result = {
    token: null,
    err: null,
  };

  const payload = {
    user: {
      id: foundUser.id,
    },
  };

  const secret = getSecret(tokenType);
  const options = getOptions(tokenType);

  if (tokenType === "access") {
    const refreshToken = tokenData.refreshToken;
    let verifyResult = verifyToken(refreshToken, "refresh");
    if (verifyResult.err) {
      result.err = verifyResult.err;
      return result;
    }
  }

  try {
    result.token = jwt.sign(payload, secret, options);
  } catch (err) {
    result.err = err;
  }
  console.log(result);
  return result;
};

const verifyToken = (token, tokenType) => {
  let result = {
    decoded: null,
    err: null,
  };

  const secret = getSecret(tokenType);

  // const options = getOptions(tokenType);

  try {
    result.decoded = jwt.verify(token, secret);
  } catch (err) {
    result.err = err;
  }
  return result;
};

module.exports = { generateToken, verifyToken };
