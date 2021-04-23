const mongoose = require("mongoose");

const AddressSchema = require("./schemas/Address");
const SocialMediaSchema = require("./schemas/Social_Media");

/**
 * @description Name schema
 * @name NameSchema
 * @contructor Name
 *
 * @typedef name
 * @property {string} [first_name] - Contact's first name
 * @property {string} [middle_name] - Contact's middle name
 * @property {string} [family_name] - Contact's family name
 */

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
 * @description Contact schema
 * @name ContactSchema
 * @constructor Contact
 *
 * @property {string} email  Required - Contact email address
 * @property {date} [dob]  Date of birth
 * @property {object} [address]  Addreess of Contact
 * @property {object} [name]  Contact full name
 * @property {object[]}[social_media]  Array of SocialMedia objects
 *
 * @typedef contact
 * @property {string} email  Required - Contact email address
 * @property {date} [dob]  Date of birth
 * @property {object} [address]  Addreess of Contact
 * @property {object} [name]  Contact full name
 * @property {object[]}[social_media]  Array of SocialMedia objects
 */
const ContactSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    dob: {
      type: Date,
    },
    address: {
      type: AddressSchema,
    },
    name: {
      type: NameSchema,
    },
    social_media: {
      type: [SocialMediaSchema],
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("contact", ContactSchema);
