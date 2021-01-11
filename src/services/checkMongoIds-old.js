// Takes in an array of user ids and comes back with an array of whether they exist or not

const checkContactExists = require("./contact/fetchContactId");

const { checkContactIds } = async (ids) => {
  let results = [];
  await Promise.all(
    ids.map(async (id) => {
      let idCheck = await checkContactExists(id);
      idCheck.status === 200 ? results.push(true) : results.push(false);
    })
  );
  return results;
};

module.exports = { checkContactIds };
