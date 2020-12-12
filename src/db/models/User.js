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
    acl_role: {
      type: Number,
      default: 500,
    },
    user_status: {
      type: Number,
      default: 150,
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
