const dbConnect = require("../../config/elephantSql/elephantConnect");
const User = require("../../models/User");
const pgResponse = require("../../services/postgresResponse");

const db = dbConnect();

const getAllUsers = async () => {
  let response;
  try {
    let result = await User.findAll({
      attributes: [
        "role",
        "email",
        "firstName",
        "lastName",
        "slug",
        "password",
      ],
    });
    response = pgResponse(200, "", result);
  } catch (err) {
    response = pgResponse(400, "", "", { error: err });
  }
  return response;
};

module.exports = getAllUsers;
