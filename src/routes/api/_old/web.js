const express = require("express");
const router = express.Router();

// Contact tasks
router.get("/start/contact/find", async (req, res) => {
  res.send("Get started - check email");
});

router.post("/start/contact/create", async (req, res) => {
  res.send("Get started - create contact");
});

// User tasks
router.post("/start/user/create", async (req, res) => {
  res.send("Get started - Create user, send confirmation email");
});

router.patch("user/confirm", async (req, res) => {
  res.send("User task - confirm - email");
});

router.patch("user/reset", async (req, res) => {
  res.send("User task - reset password - email");
});

// Subscriber tasks
router.post("/subscriber/new", async (req, res) => {
  res.send("Subscriber - new");
});

router.patch("/subscriber/edit", async (req, res) => {
  res.send("Subscriber - edit");
});

// Business tasks
router.post("/business/create", async (req, res) => {
  res.send("Web - Create business");
});

router.patch("/business/edit", async (req, res) => {
  res.send("Web - Edit business");
});

module.exports = router;
