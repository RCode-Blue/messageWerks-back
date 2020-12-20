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
  principal: {
    userAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    businessAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "business",
    },
  },
});

module.exports = mongoose.model("socialmedia", SocialMediaSchema);
