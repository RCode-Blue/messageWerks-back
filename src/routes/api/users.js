/**
 * @description Express router for user route operations
 *
 * @module routes/api/users
 * @returns {string} - user Token
 *
 * @requires express
 *
 * @requires auth
 * @requires checkUserRegistration
 * @requires getUsers
 * @requires postUser
 * @requires putDetails
 * @requires putMyPassword
 * @requires putStatus
 *
 * @borrows auth
 * @borrows checkUserRegistration
 * @borrows getUsers
 * @borrows postUser
 * @borrows putDetails
 * @borrows putMyPassword
 * @borrows putStatus
 *
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
const putMyPassword = require("../controllers/users/putMyPassword");
const putStatus = require("../controllers/users/putStatus");

/**
 * @description Route for getting users
 * @module GET:/
 * @function
 * @async
 *
 * @param {string} path Express path ("/")
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @returns {object} Object containing users or error
 */
router.get("/", async (req, res) => {
  // res.send("User route")
  await getUsers(req, res);
});

/**
 * @description Route for creating a new user.
 * @module POST:/register
 * @function
 * @async
 * @param {string} 'x-auth-token' Custom header with user token
 * @param {string} path Express path ("/register")
 * @param {object} req Express request object - User details
 * @param {object} res Express response object
 * @returns {object} Object containing user ID and token, or error
 */
router.post("/register", checkUserRegistration(), async (req, res) => {
  await postUser(req, res);
});

/**
 * @description Route for changing user password
 * @module PUT:/password
 * @function
 * @async
 * @param {string} 'x-auth-token' Custom header with user token
 * @param {string} path Express path ("/password")
 * @param {object} req Express request object - Old and new passwords
 * @param {object} res Express response object
 * @returns {object} Object containing user or error
 */
router.put("/password", auth, async (req, res) => {
  await putMyPassword(req, res);
});

/**
 * @description Creates / updates user details
 * @module PUT:/details
 * @function
 * @async
 * @param {string} 'x-auth-token' Custom header with user token
 * @param {string} path Express path ("/details")
 * @param {object} req Express request object - User details
 * @param {object} res Express response object
 * @returns {object} Object containing user object or error
 */
router.put("/details", async (req, res) => {
  putDetails(req, res);
  // res.send("PUT /email: Change email");
});

/**
 * @description Updates user account status
 * @module PUT:/status
 * @function
 * @async
 * @param {string} 'x-auth-token' Custom header with user token
 * @param {string} path Express path ("/status")
 * @param {object} req Express request object - User details
 * @param {object} res Express response object
 * @returns {object} Object containing user object or error
 */
router.put("/status", async (req, res) => {
  await putStatus(req, res);
  // res.send("PUT /status: Edit status");
});

module.exports = router;
