const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  sandbox_mode: {
    type: Boolean,
  },
  tags: {
    type: [String],
  },
  globals: {
    type: String,
  },
  messages: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: message,
  },
  status: {
    type: String,
  },
});

module.exports = mongoose.model("email", EmailSchema);
