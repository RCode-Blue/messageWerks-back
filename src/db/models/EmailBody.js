const mongoose = require("mongoose");

const EmailBodySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  emailbody_codename: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
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
    type: String,
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "business",
  },
  usage: {
    type: Number,
  },
  notes: {
    type: String,
  },
});

module.exports = mongoose.model("emailbody", EmailBodySchema);
