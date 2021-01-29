const monogoose = require("mongoose");

const MailerSchema = require("../schemas/Mailer");

const MessageSchema = new monogoose.Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mj_subject: {
    type: String,
  },
  local_template: {
    type: monogoose.Mongoose.Schema.Types.ObjectId,
    ref: "email_template",
  },
  mj_template: {
    type: String,
  },
  my_template_language: {
    type: Boolean,
  },
  mj_variables: {
    type: string,
  },
  mj_text_part: {
    type: String,
  },
  mj_html_part: {
    type: String,
  },
  mj_from: {
    type: MailerSchema,
  },
  mj_sender: {
    type: MailerSchema,
  },
  mj_to: {
    type: MailerSchema,
  },
  mj_cc: {
    type: MailerSchema,
  },

  mj_bcc: {
    type: MailerSchema,
  },
  mj_reply_to: {
    type: MailerSchema,
  },
});

module.exports = mongoose.model("message", MessageSchema);
