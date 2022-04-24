const User = require("../../../models/User");

const pgResponse = require("../../services/postgresResponse");

const patchUser = async (userData) => {
  const { uuid } = userData;
  delete userData.uuid;
  if (userData.password) {
    delete userData.password;
  }
  let response;
  try {
    await User.sync();
    let result = await User.update(userData, {
      where: { uuid },
      returning: true,
    });
    response = pgResponse(200, "", result);
  } catch (error) {
    response = pgResponse(400, "", "", { error });
  }

  return response;
};

module.exports = patchUser;
