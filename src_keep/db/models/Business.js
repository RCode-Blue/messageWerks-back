const mongoose = require("mongoose");

const BusinessAddressSchema = new mongoose.Schema({
  address: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "address",
    },
    email: {
      type: String,
    },
    address_type: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
});

const BusinessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  industry: {
    type: [String],
  },
  status: {
    type: Number,
  },
  api_key: {
    type: String,
  },
  private_key: {
    type: String,
  },
  addresses: [BusinessAddressSchema],
});

module.exports = mongoose.model("business", BusinessSchema);
