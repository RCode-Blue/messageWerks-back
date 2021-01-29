const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth/auth");
const getUserData = require("../middleware/getUserData");

const postEmailBody = require("../controllers/emailBodies/postEmailBody");

router.get("/", async (req, res) => {
  res.send("Email Body GET");
});

router.get("/:emailbody_id", async (req, res) => {
  res.send("Email body get by id");
});

router.post("/create", async (req, res) => {
  await postEmailBody(req, res);
  // res.send("Email body POST");
});

router.patch("/:emailbody_id", async (req, res) => {
  res.send("Email body PATCH");
});

router.delete("/:emailbody_id", async (req, res) => {
  res.send("Email body DELETE");
});

module.exports = router;
