const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const checkMongoId = require("../middleware/checkMongoId");
const postSocialMedia = require("../controllers/socialMedia/postSocialMedia");

// Get all social media
router.get("/" || "/:id", auth, async (req, res) => {
  res.send("Get all social media");
});

// GET social media by id
// router.get("/:id", auth, async (req, res) => {
//   res.send("Get social media by id");
// });

// GET social media search
router.get("/find", auth, async (req, res) => {
  res.send("Search social media");
});

// POST new social media
router.post("/new", auth, async (req, res) => {
  // console.log(req);
  // res.send("POST social media");
  // res.json(req.body);
  postSocialMedia(req, res);
});

module.exports = router;
