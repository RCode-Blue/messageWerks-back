const express = require("express");
const router = express.Router();
// const {google}=require("googleapis")

router.get("/", (req, res) => {
  // Get redirect url
  res.send("oauth get");
});

router.get("/logout", (req, res) => {
  res.send("logout");
});

router.get("/google/callback", (req, res) => {
  res.send("callback");
});

module.exports = router;
