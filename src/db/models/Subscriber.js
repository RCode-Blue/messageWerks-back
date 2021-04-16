const mongoose = require("mongoose");

const SubscriberSchema = new mongoose.Schema({
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "contact",
    required: true,
  },
  mailing_list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "mailinglist",
    required: true,
  },
  status: {
    type: Number,
  },
});

module.exports = mongoose.model("subscriber", SubscriberSchema);
