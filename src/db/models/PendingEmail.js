const mongoose = require("mongoose")

const appValues = require("../../config/appValues.json")
const expiry = appValues.pending_email.expiry


const PendingEmailSchema = new mongoose.Schema({
  email:{
    type: String,
    required = true
  },
  confirmation_code:{
    type: String,
    required: true
  },
  data:{
    type: String
  },
  expireAt: {
    type: Date,
    default: Date.now,
    expires: expiry
  }
});

module.exports=mongoose.model("pendingemail", PendingEmailSchema)
