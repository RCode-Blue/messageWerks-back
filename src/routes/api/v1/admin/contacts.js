/**
 * @description Express router providing admin routes for Contacts
 * @module routers/contact
 * @requires express
 */

/**
 * @description express module
 * @const
 */
const express = require("express");
/**
 * @description Express router to mount contact related functions on
 * @type {object}
 * @constant
 * @namespace adminRouter_Contact
 */
const router = express.Router();

const deleteContact = require("../../../controllers/v1/contacts/deleteContact");
const getAllContacts = require("../../../controllers/v1/contacts/getAllContacts");
const getContactById = require("../../../controllers/v1/contacts/getContactById");
const postContact = require("../../../controllers/v1/contacts/postContact");
const putContact = require("../../../controllers/v1/contacts/putContact");

const checkMongoId = require("../../../middleware/v1/checkMongoId");

// CONTACTS
/**
 * @description Route to get all contacts
 * @name get/all
 * @function
 *
 * @memberof module:routers/contact~adminRouter_Contact
 * @requires getAllContacts
 * @inner
 */
router.get("/all", async (req, res) => {
  getAllContacts(req, res);
});

/**
 * @description Route to get contact by id
 * @name get/:contact_id
 * @function
 * @memberof module:routers/contact~adminRouter-Contact
 * @requires getContactById
 * @inner
 *
 * @param {Object} req - request object
 * @param {string} req.params.contact_id - id of Contact
 * @param {string} path - Express path
 */
router.get("/:contact_id", checkMongoId, async (req, res) => {
  getContactById(req, res);
});

/**
 * @description Route for creating a new Contact
 * @name post/
 * @function
 * @memberof module:routers/contact~adminRouter_Contact
 * @requires postContact
 * @inner
 *
 * @param {Object} req - request object
 * @param {string} req.body.email - email of new Contact
 * @param {string} path - Express path
 */
router.post("/", async (req, res) => {
  postContact(req, res);
});

router.put("/:contact_id", async (req, res) => {
  await putContact(req, res);
});

/**
 * @description Route for deleting an existing Contact
 * @name delete/:contact_id
 * @function
 * @memberof module:routers/contact~adminRouter_Contact
 * @requires deleteContact
 * @inner
 *
 * @param {Object} req - request object
 * @param {string} req.params.contact_id - id of Contact
 * @param {string} path - Express path
 */
router.delete("/:contact_id", async (req, res) => {
  // console.log("delete");
  deleteContact(req, res);
});

module.exports = router;
