const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Admins GET");
});

module.exports = router;
