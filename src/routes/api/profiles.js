const express = require("express");
const router = express.Router();
const { body, checkSchema, validationResult } = require("express-validator");

const Profile = require("../../db/models/Profile");

const auth = require("../middleware/auth");
const checkMongoId = require("../middleware/checkMongoId");
// const checkSocialFields = require("../../services/profiles/checkSocialFields");
// const checkUserRegistration = require("../../services/users/checkUserRegistration");

const editSocialMedia = require("../controllers/profiles/editSocialMedia");
const getMyProfile = require("../controllers/profiles/getMyProfile");
const getProfileById = require("../controllers/profiles/getProfileById");
const getAllProfiles = require("../controllers/profiles/getAllProfiles");
const postProfile = require("../controllers/profiles/postProfile");

router.get("/me", auth, async (req, res) => {
  await getMyProfile(req, res);
});

router.get("/user/:user_id", checkMongoId, async (req, res) => {
  await getProfileById(req, res);
});

router.get("/", auth, async (req, res) => {
  await getAllProfiles(req, res);
});

router.post("/", auth, async (req, res) => {
  await postProfile(req, res);
});

router.post("/user/social", auth, async (req, res) => {
  // console.log(req.body);

  await editSocialMedia(req, res);

  // const errors = validationResult(req);
  // console.log(errors);
  // // Check for validation error
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }
  // userProfile = await getProfileById(req, res);
  // // console.log(userProfile);

  // res.json(userProfile);
});

module.exports = router;
