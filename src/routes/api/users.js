const express = require("express");
const router = express.Router();

const postUser = require("../controllers/users/postUser");

router.get("/", async (req, res) => {
  res.send("users GET (get all users)");
});

router.get("/:user_id", async (req, res) => {
  res.send("users GET:user_id");
});

router.patch("/:user_id", async (req, res) => {
  res.send("users PATCH:user_id");
});

router.post("/", async (req, res) => {
  // res.send("user POST");
  await postUser(req, res);
});

router.get("/search", async (req, res) => {
  res.send("users GET (search)");
});

router.put("/:user_id", async (req, res) => {
  res.send("users PUT:user_id (edit user details");
});

router.patch("/:user_id", async (req, res) => {
  res.send("users PATCH:user_id (edit one user detail");
});

router.delete("/:user_id", async (req, res) => {
  res.send("users DELETE:user_id");
});
