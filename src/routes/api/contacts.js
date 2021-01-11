const express = require("express");
const router = express.Router();

const deleteContact = require("../controllers/contacts/deleteContact");
const getAllContacts = require("../controllers/contacts/getAllContacts");
const getContactById = require("../controllers/contacts/getContactById");
const patchContact = require("../controllers/contacts/patchContact");
const postContacts = require("../controllers/contacts/postContact");
const putContact = require("../controllers/contacts/putContact");

const checkContactFields = require("../middleware/contact/checkContactFields");
const checkIdExists = require("../middleware/checkIdExists");
const checkMongoId = require("../middleware/checkMongoId");

router.get("/", async (req, res) => {
  await getAllContacts(req, res);
});

router.get("/:contact_id", checkMongoId, async (req, res) => {
  await getContactById(req, res);
});

router.post("/create", async (req, res) => {
  await postContacts(req, res);
});

router.put(
  "/:contact_id",
  checkMongoId,
  checkContactFields,
  checkIdExists,
  async (req, res) => {
    await putContact(req, res);
  }
);

router.patch("/:contact_id", checkMongoId, checkIdExists, async (req, res) => {
  await patchContact(req, res);
});

router.delete("/:contact_id", checkMongoId, checkIdExists, async (req, res) => {
  await deleteContact(req, res);
  // res.send("contacts DELETE:id");
});

module.exports = router;
