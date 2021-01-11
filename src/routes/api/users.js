const express = require("express");
const router = express.Router();

const checkIdExists = require("../middleware/checkIdExists");
const checkMongoId = require("../middleware/checkMongoId");
const deleteUser = require("../controllers/users/deleteUser");
const getUser = require("../controllers/users/getUser");
const getUsers = require("../controllers/users/getUsers");
const patchUser = require("../controllers/users/patchUser");
const postUser = require("../controllers/users/postUser");

router.get("/", async (req, res) => {
  await getUsers(req, res);
});

router.get("/:user_id", checkMongoId, checkIdExists, async (req, res) => {
  // res.send("users GET:user_id");
  await getUser(req, res);
});

router.post("/create", async (req, res) => {
  // res.send("user POST");
  await postUser(req, res);
});

// router.get("/search", async (req, res) => {
//   res.send("users GET (search)");
// });

// router.put("/:user_id", checkMongoId, checkIdExists, async (req, res) => {
//   res.send("users PUT:user_id (edit user details");
// });

router.patch("/:user_id", checkMongoId, checkIdExists, async (req, res) => {
  // res.send("users PATCH:user_id (edit one user detail");
  await patchUser(req, res);
});

router.delete("/:user_id", checkMongoId, checkIdExists, async (req, res) => {
  // res.send("users DELETE:user_id");
  await deleteUser(req, res);
});

module.exports = router;
