const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  addressline1: {
    type: String,
  },
  addressline2: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  zip: {
    type: String,
  },
});

module.exports = mongoose.model("address", AddressSchema);
