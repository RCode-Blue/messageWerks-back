const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema({
  owners: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  address: {
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
  },
  url: {
    type: String,
  },
});

module.exports = mongoose.model("business", BusinessSchema);
