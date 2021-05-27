/**
 * @description Social Media schema
 * @name SocialMediaSchema
 * @constructor SocialMedia
 *
 * @property {string} [social_media_name] - Social media name
 * @property {string} [user_account] - User account
 *
 * @typedef socialMedia
 * @property {string} [social_media_name] - Social media name
 * @property {string} [user_account] - User account
 */

const mongoose = require("mongoose");

const SocialMediaSchema = new mongoose.Schema({
  social_media_name: {
    type: String,
  },
  user_account: {
    type: String,
  },
});

module.exports = SocialMediaSchema;
