const express = require("express");
const router = express.Router();

/**
 * @description
 */
router.post("/user/new", async (req, res) => {
  res.send("new user");
});

module.exports = router;
