const express = require("express");
const router = express.Router();

// const url = require("url");

const auth = require("../middleware/auth/auth");
const getUserData = require("../middleware/getUserData");

const deleteEmailBody = require("../controllers/emailBodies/deleteEmailBody");
const getEmailBodies = require("../controllers/emailBodies/getEmailBodies");
const getEmailBody = require("../controllers/emailBodies/getEmailBody");
const postEmailBody = require("../controllers/emailBodies/postEmailBody");
const patchEmailBody = require("../controllers/emailBodies/patchEmailBody");

router.get("/", async (req, res) => {
  await getEmailBodies(req, res);
});

router.get(["/one/code/:code", "/one/id/:id"], async (req, res) => {
  await getEmailBody(req, res);
});

router.post("/create", async (req, res) => {
  await postEmailBody(req, res);
});

router.patch("/edit", async (req, res) => {
  await patchEmailBody(req, res);
});

router.delete("/remove", async (req, res) => {
  await deleteEmailBody(req, res);
  // res.send("Email body DELETE");
});

module.exports = router;
