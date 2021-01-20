const { Router } = require("express");
const express = require("express");
const router = express.Router();

const login = require("../controllers/jwt/login");
const checkLoginFields = require("../middleware/auth/checkLoginFields");

router.post("/login", checkLoginFields, async (req, res) => {
  await login(req, res);
});

module.exports = router;
