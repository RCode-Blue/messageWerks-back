/**
 * @description Schema for the Contact model
 * @module models
 * @name Contact
 * @returns {Object} - Contact model
 */
const mongoose = require("mongoose");

const AddressSchema = require("../schemas/Address");
const SocialMediaSchema = require("../schemas/Social_Media");

const NameSchema = new mongoose.Schema({
  first_name: {
    type: String,
  },
  middle_name: {
    type: String,
  },
  family_name: {
    type: String,
  },
});

/**
 * @name ContactSchema
 * @description Contact schema
 * @constructor Contact
 */
const ContactSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: NameSchema,
    },
    address: {
      type: AddressSchema,
    },
    dob: {
      type: Date,
    },
    social_media: {
      type: [SocialMediaSchema],
    },
    mj_contact_id: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("contact", ContactSchema);
