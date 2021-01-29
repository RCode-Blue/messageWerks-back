const mongoose = require("mongoose");

const SubscriberSchema = new mongoose.Schema({
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "contact",
    required: true,
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "business",
    required: true,
  },
  status: {
    type: Number,
    require: true,
  },
  confirmation_code: {
    type: String,
  },
});

module.exports = mongoose.model("subscriber", SubscriberSchema);
