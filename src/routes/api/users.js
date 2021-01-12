const express = require("express");
const router = express.Router();

const checkIdExists = require("../middleware/checkIdExists");
const checkMongoId = require("../middleware/checkMongoId");
const deleteUser = require("../controllers/users/deleteUser");
const getUser = require("../controllers/users/getUser");
const getUsers = require("../controllers/users/getUsers");
const passwordReset = require("../controllers/users/passwordReset");
const passwordResetEnable = require("../controllers/users/passwordResetEnable");
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

// Enable password reset
router.patch("password/enablereset/:user_email", async (req, res) => {
  await passwordResetEnable(req, res);
});

// Reset password
router.patch("password/reset/:email/:reset_code", async (req, res) => {
  await passwordReset(req, res);
});

router.patch("/:user_id", checkMongoId, checkIdExists, async (req, res) => {
  // res.send("users PATCH:user_id (edit one user detail");
  await patchUser(req, res);
});

router.delete("/:user_id", checkMongoId, checkIdExists, async (req, res) => {
  // res.send("users DELETE:user_id");
  await deleteUser(req, res);
});

module.exports = router;
