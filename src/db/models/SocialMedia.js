const mongoose = require("mongoose");

const SocialMediaSchema = new mongoose.Schema({
  media: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("socialmedia", SocialMediaSchema);
