const redis = require("redis");

const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;
const redisPassword = process.env.REDIS_PASSWORD;

const redisConnect = async () => {
  /*
  let result = {
    err: null,
    client: null,
  };
  */

  let redisClient = redis.createClient({
    port: redisPort,
    host: redisHost,
    password: redisPassword,
  });

  return redisClient;

  /*
  try {
    result.client = await redisClient.connect();

    result.client.on("connect", () => {
      console.log("Redis connected ...");
    });
  } catch (err) {
    console.error("Redis error: ", err);
    result.err = err;
    process.exit(1);
  }
  return result;
  */
};
module.exports = redisConnect;
