const mongoose = require("mongoose");
const appRoot = require("app-root-path");

const appValues = require(appRoot + "/src/v1/config/appValues.json");
const expiry = appValues.pending_email.expiry;

const PendingEmailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  confirmation_code: {
    type: String,
    // required: true,
  },
  data: {
    type: String,
  },
  createdAt: {
    type: Date,
    // expires: 1,
    default: Date.now,
    index: true,
  },
  // expireAt: {
  //   type: Date,
  //   default: Date.now() + 2 * 60 * 1000, // expires in 2 minutes
  // },
});
// PendingEmailSchema.createIndex({ createdAt: 1 }, { expireAfterSeconds: 30 });

module.exports = mongoose.model("pendingemail", PendingEmailSchema);
