const express = require("express");
const router = express.Router();

router.post("/user/new", async (req, res) => {
  res.send("new user");
});

module.exports = router;
