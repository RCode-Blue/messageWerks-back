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
  url: {
    type: String,
  },
  industry: {
    type: [String],
  },
  status: {
    type: Number,
  },
  public_api_key: {
    type: String,
  },
  private_api_key: {
    type: String,
  },
  social_media: {
    type: [SocialMediaSchema],
  },
  locations: {
    type: [LocationSchema],
  },
  managers: {
    type: [ManagerSchema],
  },
});

module.exports = mongoose.model("business", BusinessSchema);
