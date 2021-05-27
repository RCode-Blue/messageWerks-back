const validate = require("validate.js");

const jsonResponse = require("../../../services/createJsonResponse");

const checkAddressFields = require("../services/address/checkAddressFields");
const checkNameFields = require("../services/contact/checkNameFields");
const checkSocialMediaFields = require("../services/socialMedia/checkSocialMediaFields");

/**
 * @description Middleware - Checks validity of input fields for Contacts
 *
 * @module
 * @name checkContactFields
 *
 * @param {object} req - Request object
 * @param {date} req.body.dob - Date of birth
 * @param {object} req.body.address - Contact address
 * @param {object} req.body.social_media - Array of social media objects
 * @param {object} req.body.name - Contact full name
 * @param {object} res - Response object
 * @param {object} next - Next Express middleware
 *
 * @returns {object} response - Error is validationResult is not empty
 */
const checkContactFields = (req, res, next) => {
  const { dob, address, social_media, name } = req.body;
  const dobPattern = /\d{4}-\d{2}-\d{2}|^$/gs;

  let validationResult = {};
  const constraints = {
    dob: {
      format: dobPattern,
    },
  };

  // Address fields
  if (address && Object.keys(address).length != 0) {
    validationResult.address = checkAddressFields(address);
  }

  // Social media fields
  if (social_media && social_media.length > 0) {
    const hasNoErrors = (item) => {
      return item === undefined;
    };
    let socialMediaResults = checkSocialMediaFields(social_media);

    socialMediaResults.every(hasNoErrors) === true
      ? (validationResult.socialMedia = undefined)
      : (validationResult.socialMedia = checkSocialMediaFields(social_media));
  }

  // Name fields
  if (name && Object.keys(name).length != 0) {
    validationResult.name = checkNameFields(name);
  }

  // Date of birth (dob) field
  validationResult.contact = validate(req.body, constraints);

  // Aggregated results
  for (var key in validationResult) {
    if (validationResult[key] !== undefined) {
      response = jsonResponse("400", "Input field errors", validationResult);
      res.status(response.status).json(response);
    }
  }
  next();
};

module.exports = checkContactFields;
