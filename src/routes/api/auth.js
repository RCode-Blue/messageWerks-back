const { Router } = require("express");
const express = require("express");
const router = express.Router();

const checkLoginFields = require("../middleware/auth/checkLoginFields");
const login = require("../controllers/auth/login");

router.post("/login", checkLoginFields, async (req, res) => {
  await login(req, res);
});

router.post("/logout", async (req, res) => {
  res.send("Logout");
});

module.exports = router;
