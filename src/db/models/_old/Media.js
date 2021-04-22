const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema({
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: business,
  },
  name: {
    type: String,
  },
  url: {
    type: String,
  },
});

module.exports = mongoose.model("media", MediaSchema);
