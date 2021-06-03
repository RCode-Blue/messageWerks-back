/***
 * @description Express router providing public routes for PendingEmails
 * @module routers/public/user
 * @requires express
 */

/**
 * @description express module
 * @const
 */

const express = require("express");
/**
 * @description Express router to mount Pending Email related functions for public
 * @type {object}
 * @constant
 * @namespace publicRouter_PendingEmail
 */
const router = express.Router();

const pubPostPendingEmail = require("../../controllers/pendingEmail/pubPostPendingEmail");

// --USERS--
/**
 * @description Route to create new Pending Email
 * @name post:new
 * @function
 *
 * @memberof module:routers/public/pendingEmail
 * @requires pubPostPendingEmail
 * @inner
 */
router.post("/new", async (req, res) => {
  await pubPostPendingEmail(req, res);
});

module.exports = router;
