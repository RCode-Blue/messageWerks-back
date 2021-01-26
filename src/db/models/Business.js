const mongoose = require("mongoose");

const AddressSchema = require("../schemas/Address");
const SocialMediaSchema = require("../schemas/Social_Media");

const LocationSchema = new mongoose.Schema({
  address: {
    type: AddressSchema,
  },
  email: {
    type: String,
  },
  address_type: {
    type: String,
  },
  notes: {
    type: String,
  },
});

const ManagerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  business_role: {
    type: Number,
  },
});

const BusinessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  homepage: {
    type: String,
  },
  business_id: {
    type: String,
  },
  status: {
    type: Number,
  },
  api_key: {
    type: String,
  },
  email_bodies: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "emailbody",
  },
  social_media: {
    type: [SocialMediaSchema],
  },
  mailing_lists: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "mailinglist",
  },
  locations: {
    type: [LocationSchema],
  },
  managers: {
    type: [ManagerSchema],
  },
});

module.exports = mongoose.model("business", BusinessSchema);
