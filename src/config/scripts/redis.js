const redis = require("redis");

const db = process.env.REDIS_DATABASE_NAME;
const host = process.env.REDIS_HOST;
const password = process.env.REDIS_PASSWORD;
const port = process.env.REDIS_PORT;

const redisClient = () => {
  const client = redis.createClient({
    host,
    port,
    password,
  });

  // client.selected_db = db;

  client.on("error", (err) => {
    console.error(err);
  });

  return client;
};

module.exports = redisClient;
