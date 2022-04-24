const User = require("../../../models/User");

const dbConnect = require("../../../config/elephantSql/elephantConnect");
const pgResponse = require("../../services/postgresResponse");

const deleteUser = async (userData) => {
  const { uuid } = userData;
  let response;
  try {
    let result = await User.destroy({
      where: { uuid },
    });
    response = pgResponse(200, "", result);
  } catch (error) {
    response = pgResponse(400, "", "", { error });
  }
  return response;
};

module.exports = deleteUser;
