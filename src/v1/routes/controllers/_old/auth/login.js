const loginUser = require("../../../services/_old/auth/loginUser");
const redisClient = require("../../../config/scripts/redis");

const login = async (req, res) => {
  let client;
  const connect = await redisClient();
  // console.log(connect);

  if (connect.err) {
    return res.status(400).json(connect.err);
  }
  client = connect.client;
  // console.log(client);

  let result = await loginUser(req.body, client);
  console.log(result);

  res.status(result.statusCode).json(result);
};
module.exports = login;
