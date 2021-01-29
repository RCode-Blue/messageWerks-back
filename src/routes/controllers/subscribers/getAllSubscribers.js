const checkRolePermissions = require("../../../services/user/checkRolePermissions");
const fetchAllSubscribers = require("../../../services/subscriber/fetchAllSubscribers");
const processFetchResponse = require("../../../services/processFetchResponse");

const getAllSubscribers = async (req, res) => {
  let response;

  let result = await fetchAllSubscribers();
  response = processFetchResponse(result);

  res.status(response.status).json(response);
};

module.exports = getAllSubscribers;
