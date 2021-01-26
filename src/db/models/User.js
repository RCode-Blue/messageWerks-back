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
      type: mongoose.Schema.Types.ObjectId,
      ref: "contact",
    },
    password: {
      type: String,
    },
    acl_role: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
    failed_logins: {
      type: Number,
      default: 0,
    },
    reset_code: {
      type: String,
    },
    confirmation_code: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserSchema);
