const express = require("express");
const router = express.Router();

const loginUser = require("../controllers/auth/loginUser");

router.post("/login", async (req, res) => {
  const data = req.body;
  let response = await loginUser(data);
  res.set("Access-Control-Allow-Origin", "*");
  res.status(response.status).json(response);
});

module.exports = router;
