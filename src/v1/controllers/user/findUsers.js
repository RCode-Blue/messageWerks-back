const dbConnect = require("../../../config/elephantSql/elephantConnect");
const pgResponse = require("../../services/postgresResponse");

const User = require("../../../models/User");

const db = dbConnect();

const byId = async (id) => {
  let response;
  try {
    let result = await User.findByPk(id, {
      attributes: ["id", "role", "email", "firstName", "lastName"],
      exclude: ["password"],
    });
    response = pgResponse(200, "", result);
  } catch (err) {
    response = pgResponse(400, "", "", { error: err });
  }
  return response;
};

module.exports = { byId };
