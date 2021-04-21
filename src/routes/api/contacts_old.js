const express = require("express");
const router = express.Router();

const deleteContact = require("../controllers/v1/contacts/deleteContact");
const getAllContacts = require("../controllers/v1/contacts/getAllContacts");
const getContactById = require("../controllers/v1/contacts/getContactById");
const patchContact = require("../controllers/_old/contacts/patchContact");
const postContact = require("../controllers/v1/contacts/postContact");
const putContact = require("../controllers/_old/contacts/putContact");

const auth = require("../middleware/auth/auth");
const checkContactFields = require("../middleware/contact/checkContactFields");
const checkIdExists = require("../middleware/checkIdExists");
const checkMongoId = require("../middleware/v1/checkMongoId");
const getUserData = require("../middleware/getUserData");

router.get("/", auth, getUserData, async (req, res) => {
  await getAllContacts(req, res);
});

router.get(
  "/:contact_id",
  checkMongoId,
  auth,
  getUserData,
  async (req, res) => {
    await getContactById(req, res);
  }
);

router.post("/create", auth, getUserData, async (req, res) => {
  await postContact(req, res);
});

router.put(
  "/:contact_id",
  auth,
  getUserData,
  checkMongoId,
  checkContactFields,
  checkIdExists,
  async (req, res) => {
    await putContact(req, res);
  }
);

router.patch(
  "/:contact_id",
  auth,
  getUserData,
  checkMongoId,
  checkIdExists,
  async (req, res) => {
    await patchContact(req, res);
  }
);

router.delete(
  "/:contact_id",
  auth,
  getUserData,
  checkMongoId,
  checkIdExists,
  async (req, res) => {
    await deleteContact(req, res);
  }
);

module.exports = router;
