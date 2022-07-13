const redis = require("redis");

const redisUsername = process.env.REDIS_USERNAME;
const redisPassword = process.env.REDIS_PASSWORD;
const redisEndpoint = process.env.REDIS_ENDPOINT;

const redisConnect = async () => {
  let redisClient = redis.createClient({
    url: `redis://${redisUsername}${redisPassword}${redisEndpoint}`,
  });
  return redisClient;
};
module.exports = redisConnect;
