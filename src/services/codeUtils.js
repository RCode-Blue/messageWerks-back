const bcrypt = require("bcrypt");
const crypto = require("crypto");
const uuid = require("uuid");
const uuidAPIKey = require("uuid-apikey");

const hash = require("./password/hash");

// Generates uuid and creates a hash
// Used to create confirmation and reset codes
// Used by createNewSubscriber
const setCode = async () => {
  const { v4 } = uuid;

  const code = v4();
  const hash = await hash(code);

  return { code, hash };
  // Hash is saved to db
  // Code is used in email template or returned to client
};

// Verifies that a given code and the saved hash both match
const verifyCode = async (code, savedHash) => {
  const isMatch = await bcrypt.compare(code, savedHash);
  return isMatch;
};

const createSecret = (chars) => {
  return crypto.randomBytes(chars).toString("hex");
};

const createApi = () => {
  const uuidApiPair = uuidAPIKey.create();
  const api = uuidApiKey.toAPIKey(uuidApiPair.apiKey, { noDashes: true });
  return { uuid: uuidApiPair.uuid, apiKey: api };
};
// UUID saved to db
// API Key returned to client

const checkApi = (api, uuid) => {
  const savedApi = uuid.toUUID(api);
  return savedApi === api ? true : false;
};

module.exports = { createApi, createSecret, setCode, verifyCode };
