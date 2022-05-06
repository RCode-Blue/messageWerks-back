const express = require("express");
const jsonResponse = require("../../helpers/jsonResponse");
const jwt = require("jsonwebtoken");
const router = express.Router();
const getEnvSettings = require("../../helpers/getEnvSettings");

router.get("/checkheader", async (req, res) => {
  const env = getEnvSettings();
  let response;

  const secret = env.JWT_ACCESS_TOKEN_SECRET;
  const headerData = req.headers;
  let token = headerData.authorization.split(" ")[1];
  // let decoded = jwt.verify(token, secret);
  try {
    let result = jwt.verify(token, secret);
    // console.log("Result: ", result);
    response = jsonResponse(200, "Header check", result);
  } catch (error) {
    response = jsonResponse(401, "", "", error);
  }

  res.status(response.status).json(response);
});

module.exports = router;
