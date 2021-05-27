const mongoose = require("mongoose");
/**
 * @description User schema
 * @name UserSchema
 * @constructor User
 * /
 /**
  * @typedef user
  * @property {object} contact Contact object
  * @property {string} slug Required - User-friendly path for User
  * @property {string} password User password hash
  * @property {string} acl_role Required - Type of account
  * @property {int} status Account status
  * @property {int} failed_logins Required - No of times user has continuously failed login
  * @property {string} reset_code Custom generated character string to verify reset request
  *
  */

const UserSchema = new mongoose.Schema(
  {
    contact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "contact",
    },
    slug: {
      type: String,
      // required: true,
    },
    password: {
      type: String,
    },
    acl_role: {
      type: String,
      // required: true,
    },
    status: {
      type: Number,
      // required: true,
    },
    failed_logins: {
      type: Number,
      default: 0,
      // required: true,
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
