// Takes in an array of user ids and comes back with an array of whether they exist or not

const checkIdExists = require("./checkIdExists");

const checkUserIds = async (userIds) => {
  let results = [];
  await Promise.all(
    userIds.map(async (id) => {
      let value = null;
      let idCheck = await checkIdExists(id);
      idCheck.status === 200 ? results.push(true) : results.push(false);
    })
  );
  return results;
};

module.exports = checkUserIds;