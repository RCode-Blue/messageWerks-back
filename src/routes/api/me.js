const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth/auth");
const getMe = require("../controllers/me/getMe");

router.get("/", auth, async (req, res) => {
  await getMe(req, res);
});

module.exports = router;
