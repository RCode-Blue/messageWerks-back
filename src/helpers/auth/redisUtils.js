/**
 * @description Utilities for working with Redis
 * @name redisUtils
 *
 * @module
 * @requires {object} appSettings - Application settings
 */

const appSettings = require("../../config/appSettings.json");
const redisClient = require("../../config/redis/redisConnect");

// Helpers
const connectRedis = async () => {
  const client = await redisClient();
  await client.connect();

  let result = { error: null, client: null };

  try {
    result.client = client;
  } catch (err) {
    result.error = error;
  }

  return result;
};

// Exported
const checkRefreshToken = async (uuid) => {
  const { project_id } = appSettings.project;

  const connectResult = await connectRedis();
  let client;
  if (!connectResult.error) {
    client = connectResult.client;
  }

  let refreshToken = await client.get(`${project_id}:${uuid}`);
  let ttl = await client.ttl(`${project_id}:${uuid}`);
  if (refreshToken) {
    return refreshToken;
  } else {
    return false;
  }
};

/**
 * @description Saves refresh token to Redis database
 * @name setRefreshToken
 *
 * @function
 * @param {object} refreshData
 * @param {integer} refreshData.role - User role
 * @param {string} refreshData.uuid - UUID for the user account (generated at creation)
 * @param {string} refreshData.project_id - Project ID (defined in application settings)
 * @param {string} refreshData.token - Refresh token
 *
 * @returns {string} "OK" if successful, error message if not
 */
const setRefreshToken = async (refreshData) => {
  const { project_id, uuid, refreshToken } = refreshData;
  const refreshKey = `${project_id}:${uuid}`;
  const refreshExpiry = appSettings.jwt_values.refresh_options.expiresIn;

  const connectResult = await connectRedis();
  let client;
  if (!connectResult.error) {
    client = connectResult.client;
  }

  let msg = await client.setEx(refreshKey, refreshExpiry, refreshToken);
  return msg;
};

module.exports = { checkRefreshToken, setRefreshToken };
