/**
 * @description Shared code repository
 * @name scramble
 * @module
 */

const bcrypt = require("bcrypt");
const uuid = require("uuid");
const appRoot = require("app-root-path");

const appValues = require(appRoot + "/src/v1/config/appValues.json");

/**
 * @description Creates a one-way salted hash of a string before storing it into a database
 * @function
 * @requires bcrypt
 *
 * @param {string} codeString - Password or string to be hashed
 * @returns {string} undefined - Hash of input
 *
 */
const createHash = async (password) => {
  const saltRounds = appValues.password.encryption.saltRounds;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hashSync(password, salt);
  return hash;
};

/**
 * @description Verifies that a given password or string matched the saved hash
 * @function
 * @requires bcrypt
 *
 * @param {string} passCode - Password or string received from client
 * @param {string} savedHash - Hash that was saved in database
 *
 * @returns {boolean} undefined - Confirmation on match
 */
const verifyHash = async (password, savedHash) => {
  const isMatch = await bcrypt.compare(password, savedHash);
  return isMatch;
};

/**
 * @description generates a UUID (saved to DB) and API (returned to client)
 * key pair
 * @function
 *
 * @returns {object} undefined - Object containing UUID and API Key
 */
const createApi = () => {
  const uuidApiPair = uuidAPIKey.create();
  const api = uuidApiKey.toAPIKey(uuidApiPair.apiKey, { noDashes: true });
  return { uuid: uuidApiPair.uuid, apiKey: api };
};

/**
 * @description Verifies that a given UUID and its API key matches
 * @function
 *
 * @returns {boolean} - undefined - Confirmation of match
 */
const verifyApi = (api, uuid) => {
  const savedApi = uuid.toUUID(api);
  return savedApi === api ? true : false;
};

/**
 * @description Generates a UUID and its hash. Used for confirmation code
 * @function
 *
 * @returns {object} undefined
 * @returns {string} code - The generated UUID (Used in email template or returned to client)
 * @returns {string} hash - The hash of the UUID (Saved to DB)
 */
const createConfirmationCode = async () => {
  const { v4 } = uuid;

  const saltRounds = appValues.pending_email.confirmation_code.salt_rounds;
  const salt = await bcrypt.genSalt(saltRounds);
  const code = v4();
  const hash = await bcrypt.hashSync(code, salt);

  return { code: code, hash: hash };
};

/**
 * @description Verifies that a confirmation code and its hash match
 * @function
 *
 * @param {string} code - Confirmation code
 * @param {string} savedHash - Hash of confirmation code (in DB)
 *
 * @returns {boolean} undefined - Confirmation of verification
 */
const verifyCode = async (code, savedHash) => {
  const isMatch = await bcrypt.compare(code, savedHash);
  return isMatch;
};

module.exports = {
  createApi,
  verifyApi,
  createConfirmationCode,
  verifyCode,
  createHash,
  verifyHash,
};
