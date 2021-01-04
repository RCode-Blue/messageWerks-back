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
  dob: {
    type: Date,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "address",
  },
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
});

module.exports = mongoose.model("profile", ProfileSchema);
