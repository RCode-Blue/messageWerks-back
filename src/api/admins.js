const express = require("express");
const router = express.Router();

const dbConnect = require("../config/elephantSql/elephantConnect");
const Admin = require("../models/Admin");

const db = dbConnect();

// const getAllUsers = require("../controllers/user/getAllUsers");

router.get("/all", async (req, res) => {
  // res.send("All Users");
  Admin.findAll({
    attributes: ["email", "first_name", "last_name", "slug", "password"],
  })
    .then((admins) => {
      console.log(admins);
      res.sendStatus(200);
    })
    .catch((err) => console.error(err));
});

module.exports = router;
