/**
 * @description Utilities for working with Redis
 * @name redisUtils
 *
 * @module
 * @requires {object} appSettings - Application settings
 */

const appSettings = require("../../config/appSettings.json");
const redisClient = require("../../config/redis/redisConnect");

const getRefreshToken = async () => {};

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
  const { uuid, project_id, token: refreshToken } = refreshData;

  const refreshKey = `${project_id}:${uuid}`;
  const refreshValue = refreshToken;
  const refreshDuration = appSettings.jwt_values.refresh_options.expiresIn;

  const client = await redisClient();
  await client.connect();

  client.on("error", (error) => {
    console.error("Error: ", error);
  });
  client.on("connect", () => {
    console.log("Redis Connected");
  });

  let msg = await client.setEx(refreshKey, refreshDuration, refreshValue);
  return msg;
};

module.exports = { getRefreshToken, setRefreshToken };
