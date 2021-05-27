/**
 * @description Express router providing admin routes for Users
 * @module routers/user
 * @requires express
 */

/**
 * @description express module
 * @const
 */

const express = require("express");
/**
 * @description Express router to mount user related functions for admins
 * @type {object}
 * @constant
 * @namespace adminRouter_User
 */
const router = express.Router();
const pubPostPendingEmail = require("../../controllers/pendingEmail/pubPostPendingEmail");

// const auth = require("../../../middleware/auth/auth");
// const checkIdExists = require("../../../middleware/checkIdExists");
// const checkMongoId = require("../../../middleware/v1/checkMongoId");
// const getUserData = require("../../../middleware/getUserData");

// const confirmUser = require("../../users/confirmUser");
// const deleteUser = require("../../users/deleteUser");
// const getUser = require("../../../controllers/_old/users/getUser");
// const getUsers = require("../../../controllers/_old/users/getUsers");
// const passwordReset = require("../../users/passwordReset");
// const passwordResetEnable = require("../../users/passwordResetEnable");
// const patchUser = require("../../users/patchUser");

// USERS
/*
router.get(
  "/",
  // auth,
  // getUserData,
  async (req, res) => {
    await getUsers(req, res);
  }
);
*/

/*
router.get(
  "/:user_id",
  // auth,
  // getUserData,
  // checkMongoId,
  // checkIdExists,
  async (req, res) => {
    await getUser(req, res);
  }
);
*/

router.post(
  "/signup/new",
  // auth,
  // getUserData,
  async (req, res) => {
    await pubPostPendingEmail(req, res);
  }
);

/*
// Edit user detail
router.patch(
  "/:user_id",
  auth,
  getUserData,
  checkMongoId,
  checkIdExists,
  async (req, res) => {
    await patchUser(req, res);
  }
);
*/

/*
// Delete User
router.delete(
  "/:user_id",
  auth,
  getUserData,
  checkMongoId,
  async (req, res) => {
    await deleteUser(req, res);
  }
);
*/

// Password reset routes
// ---------------------
// Enable password reset (test)
router.patch("/password/enablereset/:user_email", async (req, res) => {
  await passwordResetEnable(req, res);
});

// Reset password
router.patch("/password/reset/:email/:reset_code", async (req, res) => {
  await passwordReset(req, res);
});

router.patch("/password/reset", async (req, res) => {
  await passwordReset(req, res);
});

/*
// User confirmation routes
// ------------------------
// Set user confirmation code (test)
router.patch("/confirm/set", async (req, res) => {
  // res.send("Set user confirmation code");
  await confirmUser.setConfirmCode(req, res);
});

// Confirm user
router.patch("/confirm/yes/:email/:confirmation_code", async (req, res) => {
  // res.send("User confirmation YES");
  await confirmUser.confirm(req, res);
});

router.patch("./confirm/yes/", async (req, res) => {
  res.send("User confirmation YES");
});
*/

module.exports = router;
