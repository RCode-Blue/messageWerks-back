const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    firstname: {
      type: String,
      required: true,
    },
    middlename: {
      type: String,
    },
    familyname: {
      type: String,
      required: true,
    },
  },
  address: {
    addressline1: {
      type: String,
      required: true,
    },
    addressline2: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
    },
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", UserSchema);
