const mongoose = require("mongoose");

const AddressSchema = require("../schemas/Address");
const SocialMediaSchema = require("../schemas/Social_Media");

const ManagerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  business_role: {
    type: Number,
  },
});

const ApiKeySchema = new mongoose.Schema({
  uuid_key: {
    type: String,
  },
  usage: {
    type: Number,
    default: 0,
  },
  source_url: {
    type: String,
  },
});

const BusinessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
  },
  slug: {
    type: String,
    required: true,
  },
  homepage: {
    type: String,
  },
  api_key: {
    type: ApiKeySchema,
  },
  social_media: {
    type: [SocialMediaSchema],
  },

  address: {
    type: AddressSchema,
  },
  managers: {
    type: [ManagerSchema],
  },
});

module.exports = mongoose.model("business", BusinessSchema);
