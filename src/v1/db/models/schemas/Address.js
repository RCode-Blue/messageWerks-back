/**
 * @description Address Schema
 * @name AddressSchema
 * @constructor Address
 *
 * @property {string} [address_line1] - Address line 1
 * @property {string} [address_line2] - Address line 2
 * @property {string} [city] - City
 * @property {string} [state] - State/Province
 * @property {string} [country] - Country
 * @property {string} [zip] - Zip or Postcode
 * @property {string} [telephone] - Telephone number
 *
 * @typedef address
 * @property {string} [address_line1] - Address line 1
 * @property {string} [address_line2] - Address line 2
 * @property {string} [city] - City
 * @property {string} [state] - State/Province
 * @property {string} [country] - Country
 * @property {string} [zip] - Zip or Postcode
 * @property {string} [telephone] - Telephone number
 */

const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  address_line1: {
    type: String,
  },
  address_line2: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  zip: {
    type: String,
  },
  telephone: {
    type: String,
  },
});

module.exports = AddressSchema;
