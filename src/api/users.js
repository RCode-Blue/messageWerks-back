const express = require("express");
const router = express.Router();

const dbConnect = require("../config/elephantSql/elephantConnect");
const User = require("../models/User");
const getAllUsers = require("../controllers/user/getAllUsers");

const db = dbConnect();

router.get("/all", async (req, res) => {
  let response = await getAllUsers();
  res.status(response.status).json(response);
});

module.exports = router;
