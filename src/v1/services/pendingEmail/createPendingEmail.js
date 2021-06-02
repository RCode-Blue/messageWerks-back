const PendingEmail = require("../../db/models/PendingEmail.js");
const createQueryResponse = require("../createQueryResponse");
const { createConfirmationCode } = require("../scramble");

/**
 * @description Creates a new Pending Email entry
 * @module
 * @name createPendingEmail
 *
 * @param email - New email address to be added
 *
 * @requires PendingEmail - PendingEmail object
 * @requires scramble - Function to generate a hash of the Confirmation Code
 *
 * @returns {responseTemplate} undefined - Result of POST request
 * @property {object} responseTemplate.data - PendingEmail object
 * @property {string} responseTemplate.data.confirmation_code - Confirmation Code
 * @property {string} responseTemplate.data.hash - Hash of Confirmation Code
 */
const createPendingEmail = async (email) => {
  const code = await createConfirmationCode();
  // const code = await scramble.createCode();

  let result;
  let filter = {
    email: email,
  };
  let data = {
    email: email,
    confirmation_code: code.hash,
    createdAt: new Date(),
  };

  await PendingEmail.createIndexes(
    ([{ createdAt: 1 }],
    {
      expireAfterSeconds: 90,
      name: "pending_email_index",
    }),
    function (err, doc) {
      if (err) {
        console.log("---ERR---");
        console.error(err);
      } else {
        console.log("---DOC---");
        console.log(doc);
      }
    }
  );

  try {
    let createPendingResult = await PendingEmail.findOneAndUpdate(
      filter,
      data,
      {
        upsert: true,
        new: true,
      }
    );
    result = { ...createPendingResult._doc };
    result.confirmation_code = code.code;
    result.hash = code.hash;

    return createQueryResponse.postResponse(null, result);
  } catch (err) {
    return createQueryResponse.postResponse(true, null, err);
  }
};

module.exports = createPendingEmail;
