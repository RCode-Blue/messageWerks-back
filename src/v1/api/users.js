const express = require("express");
const router = express.Router();

const dbConnect = require("../../config/elephantSql/elephantConnect");
const findUsers = require("../controllers/user/findUsers");
const getAllUsers = require("../controllers/user/getAllUsers");
const postUser = require("../controllers/user/postUser");

const db = dbConnect();

router.get("/all", async (req, res) => {
  let response = await getAllUsers();
  res.status(response.status).json(response);
});

router.get("/id", async (req, res) => {
  const userId = req.body.id;
  let response = await findUsers.byId(userId);
  res.status(response.status).json(response);
});

router.post("/create", async (req, res) => {
  const user = req.body;
  let response = await postUser(user);
  res.status(response.status).json(response);
});

module.exports = router;
