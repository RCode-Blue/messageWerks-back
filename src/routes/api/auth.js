const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");

// const User = require("../../db/models/User");
const login = require("../../services/auth/login");

const checkLoginFields = require("../../services/auth/checkLoginFields");

router.post("/", checkLoginFields(), async (req, res) => {
  const errors = validationResult(req);
  // console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    login(req, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
