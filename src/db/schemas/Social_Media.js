const mongoose = require("mongoose");

const SocialMediaSchema = new mongoose.Schema({
  media: {
    type: String,
  },
  user_id: {
    type: String,
  },
});

module.exports = SocialMediaSchema;
