const redis = require("redis");

const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;
const redisPassword = process.env.REDIS_PASSWORD;

const redisConnect = async () => {
  let redisClient = redis.createClient({
    port: redisPort,
    host: redisHost,
    password: redisPassword,
  });

  return redisClient;
};
module.exports = redisConnect;
