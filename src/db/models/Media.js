const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema({
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: business,
  },
  media_id: {
    type: String,
  },
});

module.exports = mongoose.model("media", MediaSchema);
