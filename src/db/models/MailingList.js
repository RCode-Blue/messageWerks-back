const monogoose = require("mongoose");

const MailingListSchema = new monogoose.Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    resuired: true,
  },
  email_body: {
    type: monogoose.Schema.Types.ObjectId,
    ref: "emailbody",
  },
});

module.exports = mongoose.model("mailinglist", MailingListSchema);
