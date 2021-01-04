const validate = require("validate.js");

const checkAddressFields = require("../address/checkAddressFields");
const checkNameFields = require("./checkNameFields");
const checkSocialMediaFields = require("../socialMedia/checkSocialMediaFields");

const checkContactFields = (req) => {
  const { dob, address, social_media, name } = req.body;

  // console.log(email);
  // console.log(dob);
  // console.log(address);
  // console.log(social_media);
  // console.log(name);

  const dobPattern = /\d{4}-\d{2}-\d{2}|^$/gs;

  let validationResult = {};

  const constraints = {
    dob: {
      format: dobPattern,
    },
  };

  if (address && Object.keys(address).length != 0) {
    validationResult.address = checkAddressFields(address);
  }

  if (social_media && social_media.length > 0) {
    const hasNoErrors = (item) => {
      return item === undefined;
    };

    let socialMediaResults = checkSocialMediaFields(social_media);

    socialMediaResults.every(hasNoErrors) === true
      ? (validationResult.socialMedia = undefined)
      : (validationResult.socialMedia = checkSocialMediaFields(social_media));
  }

  if (name && Object.keys(name).length != 0) {
    validationResult.name = checkNameFields(name);
  }
  validationResult.contact = validate(req.body, constraints);

  return validationResult;
};

module.exports = checkContactFields;
