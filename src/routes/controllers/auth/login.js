const jsonResponse = require("../../../services/createJsonResponse");
const loginUser = require("../../../services/auth/loginUser");

const login = async (req, res) => {
  const { email, password } = req.body;
  let result = await loginUser(email, password);

  if (result.isMatch) {
    response = jsonResponse("401", "Invalid credentials");
  }

  if (result.jwt) {
    if (result.jwt.err) {
      response = jsonResponse("500", "Error generating token", result.jwt.err);
    } else {
      response = jsonResponse(
        "200",
        "Token generated successfully",
        result.jwt.token
      );
    }
  }

  res.status(response.status).json(response);
};
module.exports = login;
