const jsonResponse = require("../../../services/createJsonResponse");
const loginUser = require("../../../services/jwt/loginUser");

const login = async (req, res) => {
  const { email, password } = req.body;
  let result = await loginUser(email, password);
  // User not found
  if (result.userNotFound) {
    response = jsonResponse("404", "User not found");
  }
  // Wrong password
  else if (result.noMatch) {
    response = jsonResponse("401", "Invalid credentials");
  }
  // Max login attempts exceeded
  else if (result.maxedOut) {
    response = jsonResponse("400", "Maximum login attempts exceeded");
  }
  // Correct password
  else if (result.jwt) {
    if (result.jwt.err) {
      response = jsonResponse("500", "Error generating token", result.jwt.err);
    } else {
      response = jsonResponse("200", "Token generated successfully", {
        token: result.jwt.token,
      });
    }
  }

  res.status(response.status).json(response);
};
module.exports = login;
