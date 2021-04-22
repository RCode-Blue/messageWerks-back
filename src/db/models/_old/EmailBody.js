const mongoose = require("mongoose");

const EmailBodySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "business",
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  email_type: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
  },
  description: {
    type: String,
  },
  subject: {
    type: String,
  },
  html_part: {
    type: String,
  },
  text_part: {
    type: String,
  },
  variables: {
    type: [String],
  },
  notes: {
    type: String,
  },
  usage: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("emailbody", EmailBodySchema);
