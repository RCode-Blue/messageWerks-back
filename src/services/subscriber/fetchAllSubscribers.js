const Subscriber = require("../../db/models/Subscriber");

const createFetchResponse = require("../v1/createFetchResponse");
const jsonResponse = require("../v1/createJsonResponse");

const fetchAllSubscribers = async () => {
  let result;

  const filter = {};
  const projection = [];
  const options = {};

  const callBack = (err, docs) => {
    result = createFetchResponse(err, docs);
  };

  await Subscriber.find(filter, projection, options, callback);

  return result;
};

module.exports = fetchAllSubscribers;
