const express = require("express");
const router = express.Router();

const dbConnect = require("../config/elephantSql/elephantConnect");
const User = require("../models/User");
const getAllUsers = require("../controllers/user/getAllUsers");

const db = dbConnect();

// router.get("/all", async (req, res) => {
//   User.findAll({
//     attributes: ["role", "email", "firstName", "lastName", "slug", "password"],
//   })
//     .then((users) => {
//       // console.log(users[0].dataValues);

//       res.sendStatus(200);
//     })
//     .catch((err) => console.error(err));
// });

router.get("/all", async (req, res) => {
  let response = await getAllUsers();
  res.status(response.status).json(response);
});

module.exports = router;
