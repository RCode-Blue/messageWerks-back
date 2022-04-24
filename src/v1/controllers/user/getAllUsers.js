const dbConnect = require("../../../config/elephantSql/elephantConnect");
const pgResponse = require("../../services/postgresResponse");

const User = require("../../../models/User");

const db = dbConnect();

const getAllUsers = async () => {
  let response;
  const attributes = [
    "id",
    "role",
    "email",
    "first_name",
    "last_name",
    "password",
  ];
  try {
    let result = await User.findAll({
      attributes,
    });
    response = pgResponse(200, "", result);
  } catch (error) {
    response = pgResponse(400, "", "", { error });
  }
  return response;
};

module.exports = getAllUsers;
