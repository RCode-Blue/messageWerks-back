/**
 * @description Schema for the User model
 * @module models
 * @name User
 * @returns {Object} - User model
 */
const mongoose = require("mongoose");

/**
 * @name UserSchema
 * @description User schema
 * @constructor User
 */
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "profile",
    },
    social_media: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "social_media",
    },
    acl_roles: {
      type: [String],
      default: "_10",
    },
    status: {
      type: String,
      default: "_50",
    },
    failed_logins: {
      type: Number,
    },
    mj_contact_id: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserSchema);
