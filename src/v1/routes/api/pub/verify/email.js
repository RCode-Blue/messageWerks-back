const express = require("express");
const router = express.Router();
router.post("/email/:email_confirmation_code", async (req, res) => {
  res.send("confirm email");
});

module.exports = router;
