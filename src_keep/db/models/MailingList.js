const mongoose = require("mongoose");

const MailingListSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email_template: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "emailtemplate",
  },
});

module.exports = mongoose.model("mailinglist", MailingListSchema);
