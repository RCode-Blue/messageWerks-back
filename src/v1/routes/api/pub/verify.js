const express = require("express");
const router = express.Router();

const pubConfirmPendingEmail = require("../../controllers/pendingEmail/pubConfirmPendingEmail");

router.post("/email/", async (req, res) => {
  await pubConfirmPendingEmail(req, res);
});

module.exports = router;
