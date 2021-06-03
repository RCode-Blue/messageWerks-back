/**
 * @description Express router providing admin routes for Contacts
 * @module routers/admin/contact
 * @requires express
 */

/**
 * @description express module
 * @const
 */

const express = require("express");
/**
 * @description Express router to mount admin-contact related functions on
 * @type {object}
 * @constant
 * @namespace adminRouter_Contacts
 */
const router = express.Router();

const deleteContact = require("../../controllers/contacts/deleteContact");
const getAllContacts = require("../../controllers/contacts/getAllContacts");
const getContactById = require("../../controllers/contacts/getContactById");
const postContact = require("../../controllers/contacts/postContact");
const putContact = require("../../controllers/contacts/putContact");

const checkMongoId = require("../../middleware/checkMongoId");

// --CONTACTS--
/**
 * @description Route to get all contacts
 * @name get:all
 * @function
 *
 * @memberof module:routers/admin/contact~adminRouter_contacts
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

/**
 * @description Route for updating a Contact
 * @name put/
 * @function
 * @memberof module:routers/contact~adminRouter_Contact
 * @requires putContact
 * @inner
 *
 * @param {Object} req - request object
 * @param {contact} req.body - Contact data for updating
 * @param {string} path - Express path
 */
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
