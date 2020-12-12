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
    type: mongoose.Schema.Types.ObjectId,
    ref: "address",
  },
  dob: {
    type: Date,
  },
  socialmedia: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "socialmedia",
    },
  ],
});

module.exports = mongoose.model("profile", ProfileSchema);
