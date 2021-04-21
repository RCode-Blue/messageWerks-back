const validate = require("validate.js");

/**
 * @description Checks ssocial media fields
 * @module
 * @name checkSocialMediaFields
 *
 * @requires validate.js
 * @param {object} socialMedia - Address of contact
 *
 * @returns {object} Validation results
 */
const checkSocialMediaFields = (socialMedia) => {
  let socialMediaValidation = [];
  socialMedia.forEach((element) => {
    // const index = socialMedia.indexOf(element);
    const constraints = {
      media: {
        presence: { allowEmpty: false },
      },
      user_id: {
        presence: { allowEmpty: false },
      },
    };

    socialMediaValidation.push(validate(element, constraints));
  });
  return socialMediaValidation;
};

module.exports = checkSocialMediaFields;
