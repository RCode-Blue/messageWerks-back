/**
 * @description Express router for user route operations
 * @module routes/users
 * @requires express
 * @requires checkUserRegistration
 * @borrows checkUserRegistration
 * @requires postUser
 * @borrows postUser
 * @requires User
 * @borrows User
 * @returns {string} - user Token
 */
const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const {
  checkUserRegistration,
} = require("../middleware/users/checkUserRegistration");
const getUsers = require("../controllers/users/getUsers");
const postUser = require("../controllers/users/postUser");
const putDetails = require("../controllers/users/putDetails");
const putPasswordById = require("../controllers/users/putPasswordById");
const putStatus = require("../controllers/users/putStatus");

/**
 * Route for getting users
 * @module get/
 * @function
 * @param {string} path Express path
 * @param {Object} req Express request object
 * @param {Object} res Express result object
 * @returns {Object} res User object
 */
router.get("/", (req, res) => {
  // res.send("User route")
  getUsers(req, res);
});

/**
 * @description Route for creating a new user.
 * @module post/
 * @function
 * @async
 * @param {string} path Express path
 * @param {Object} req Express request object - User details
 * @param {Object} res Express result object
 * @returns {Object} res New user ID
 */
router.post("/register", checkUserRegistration(), async (req, res) => {
  postUser(req, res);
});

router.put("/password", auth, (req, res) => {
  putPasswordById(req, res);
});

router.put("/details", async (req, res) => {
  putDetails(req, res);
  // res.send("PUT /email: Change email");
});

router.put("./status", async (req, res) => {
  putStatus(req, res);
  // res.send("PUT /status: Edit status");
});

module.exports = router;
