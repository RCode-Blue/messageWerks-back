const fetchAllContacts = require("../../../services/contact/fetchAllContacts");
const processFetchResponse = require("../../../services/processFetchResponse");

const getAllContacts = async (req, res) => {
  let result = await fetchAllContacts();
  let response = processFetchResponse(result);

  res.status(response.status).json(response);
};

module.exports = getAllContacts;
