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
const UserSchema = new mongoose.Schema({
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

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
});

module.exports = mongoose.model("user", UserSchema);
