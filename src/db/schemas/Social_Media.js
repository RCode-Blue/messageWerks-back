const mongoose = require("mongoose");

const SocialMediaSchema = new mongoose.Schema({
  social_media_name: {
    type: String,
  },
  user_account: {
    type: String,
  },
});

module.exports = SocialMediaSchema;
