const mongoose = require("mongoose");

const EmailBodySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email_body_id: {
    type: String,
    required: true,
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "business",
  },
  description: {
    type: String,
  },
  body: {
    type: String,
  },
  attributes: {
    type: String,
  },
});

module.exports = mongoose.model("emailbody", EmailBodySchema);
