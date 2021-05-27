/***
 * @description Express router providing public routes for PendingEmails
 * @module routers/pub/pendingEmail
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
 * @name post/new
 * @function
 *
 * @memberof module:routers/pub/pendingEmail-publicRouter_Contact
 * @requires pubPostPendingEmail
 * @inner
 */
router.post("/new", async (req, res) => {
  await pubPostPendingEmail(req, res);
});

module.exports = router;
