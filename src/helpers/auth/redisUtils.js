const appSettings = require("../../config/appSettings.json");
const redisClient = require("../../config/redis/redisConnect");

const redis = require("redis");
const redisConnect = require("../../config/redis/redisConnect");

const setRefreshToken = async (refreshData) => {
  const { role, uuid, project_id, token: refreshToken } = refreshData;

  const refreshKey = `${project_id}_${uuid}`;
  const refreshValue = refreshToken;
  const refreshDuration = appSettings.jwt_values.refresh_options.expiresIn;

  const client = await redisClient();
  // console.log(client);
  await client.connect();

  // const client = redis.createClient({
  //   host: "127.0.0.1",
  //   port: 6379,
  //   password: "",
  // });

  // const client = await redisConnect().client;

  // console.log(client);

  // await client.connect();

  client.on("error", (error) => {
    console.error("Error: ", error);
  });
  client.on("connect", () => {
    console.log("Redis Connected!");
  });

  let msg = await client.setEx(refreshKey, refreshDuration, refreshValue);
};

module.exports = { setRefreshToken };
