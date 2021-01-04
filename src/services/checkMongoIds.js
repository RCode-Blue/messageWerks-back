// Takes in an array of user ids and comes back with an array of whether they exist or not

const checkIdExists = require("./checkIdExists");

const checkIds = async (ids) => {
  let results = [];
  await Promise.all(
    ids.map(async (id) => {
      let idCheck = await checkIdExists(id);
      idCheck.status === 200 ? results.push(true) : results.push(false);
    })
  );
  return results;
};

module.exports = checkIds;
