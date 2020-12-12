const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "business",
    required: "true",
  },
  permissions: {
    type: String,
  },
});

module.exports = mongoose.model("client", ClientSchema);
