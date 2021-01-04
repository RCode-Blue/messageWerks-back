const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  address_line1: {
    type: String,
  },
  address_line2: {
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
  telephone: {
    type: String,
  },
});

module.exports = AddressSchema;
