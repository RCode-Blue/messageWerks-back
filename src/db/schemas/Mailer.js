const mongoose = require("mongoose");

const MailerSchema = new monogoose.Mongoose.Schema({
  email: {
    type: String,
  },
  name: {
    type: String,
  },
});

module.exports = MailerSchema;
