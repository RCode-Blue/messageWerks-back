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
    contact: {
      type: mongoose.Types.ObjectId,
      ref: "contact",
      required: true,
    },
    password: {
      type: String,
    },
    acl_role: {
      type: String,
    },
    status: {
      type: Number,
    },
    failed_logins: {
      type: Number,
    },
    reset_code: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserSchema);
