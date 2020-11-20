const express = require("express");
const router = express.Router();

const Profile = require("../../db/models/Profile");

const auth = require("../middleware/auth");
const checkMongoId = require("../middleware/checkMongoId");

const postProfile = require("../../services/profiles/postProfile");
const getMyProfile = require("../../services/profiles/getMyProfile");
const getProfileById = require("../../services/profiles/getProfileById");
const getAllProfiles = require("../../services/profiles/getAllProfiles");

router.get("/me", auth, async (req, res) => {
  await getMyProfile(req, res);
});

router.get(
  "/user/:userid",

  async (params, res) => {
    // console.log(params.params.userid);
    await getProfileById(params.params.userid, res);
  }
);

router.get("/", auth, async (req, res) => {
  await getAllProfiles(req, res);
});

router.post("/", auth, async (req, res) => {
  await postProfile(req, res);
});

module.exports = router;
