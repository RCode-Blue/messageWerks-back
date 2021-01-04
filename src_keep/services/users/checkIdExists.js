// checks if a user id exists

const findUser = require("./findUser");

const checkIdExists = async (userid, res) => {
  // let checkResult = await findUser.byUserId({ id: userid }, res);
  let checkResult = await findUser.byUserId(userid);
  // console.log(checkResult);
  if (checkResult === null) {
    return {
      status: 404,
      name: "Not found",
    };
  }

  if (checkResult.statusCode === 500) {
    return checkResult;
  }

  if (checkResult.email) {
    return {
      status: 200,
      name: "OK",
      user: checkResult,
    };
  }

  return { checkResult };
};

module.exports = checkIdExists;
