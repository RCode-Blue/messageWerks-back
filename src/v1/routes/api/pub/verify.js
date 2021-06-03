/**
 * @description Express router providing public routes for verification
 * @module routers/pub/verify
 * @requires express
 */

/**
 * @description express module
 * @const
 */

const express = require("express");
/**
 * @description Express router to mount public-user related functions
 * @type {object}
 * @constant
 * @namespace publicRouter_Verify
 */
const router = express.Router();

const pubConfirmPendingEmail = require("../../controllers/pendingEmail/pubConfirmPendingEmail");

// --EMAIL CONFIRMATION--
/**
 * @description Route to create a Pending Email
 * @name post:email
 * @function
 *
 * @memberof module:routers/pub/verify~publicRouter_verify
 * @requires pubConfirmPendingEmail
 * @inner
 */
router.post("/email/", async (req, res) => {
  await pubConfirmPendingEmail(req, res);
});

module.exports = router;
