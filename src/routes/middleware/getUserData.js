const findUser = require("./services/user/findUser");

const getUserData = async (req, res, next) => {
  const userId = req.userId;
  const foundUser = await findUser.byId(userId);
  req.acl_role = foundUser.acl_role;

  next();
};
module.exports = getUserData;
