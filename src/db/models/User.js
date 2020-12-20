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
    aclRoles: {
      type: Number,
      default: 500,
    },
    failedLogins: {
      type: Number,
    },
    status: {
      type: Number,
      default: 150,
    },
    mjContactId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserSchema);
