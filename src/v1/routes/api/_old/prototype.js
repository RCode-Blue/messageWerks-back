const express = require("express");
const router = express.Router();

const emailRequest = require("../controllers/email/emailRequest");

router.post("/sendemail", async (req, res) => {
  await emailRequest(req, res);
  // res.send("Create email");
});

module.exports = router;
