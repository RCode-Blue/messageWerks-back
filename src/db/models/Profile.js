/**
 * @description Schema for user schema
 * @module models
 * @name Profile
 * @returns {Object} - Profile model
 */
const mongoose = require("mongoose");

/**
 * @name ProfileSchema
 * @description Profile schema
 * @constructor Profile
 */
const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
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
  dob: {
    type: Date,
  },
  socialmedia: [
    {
      media: {
        type: String,
      },
      userid: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("profile", ProfileSchema);
