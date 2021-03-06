const express = require("express");
const router = express.Router();

const getAllSubscribers = require("../../services/subscriber/fetchAllSubscribers");
const postSubscriber = require("../controllers/subscribers/postSubscriber");

router.get("/", async (req, res) => {
  await getAllSubscribers();
});

router.get("/search", async (req, res) => {
  res.send("Subscriber search");
});

router.post("/create", async (req, res) => {
  await postSubscriber(req, res);
  // res.send("Create new subscriber");
});

router.patch("/:email/:business_id", async (req, res) => {
  res.send("Change confirmation & status");
});

router.delete("/:email/:business_id", async (req, res) => {
  res.send("Delete subscriber");
});

module.exports = router;
