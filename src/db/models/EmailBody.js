const mongoose = require("mongoose");

const EmailBodySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
