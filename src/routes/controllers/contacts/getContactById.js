const searchContact = require("../../../services/contact/searchContact");
const processFetchResponse = require("../../../services/processFetchResponse");

const getContactById = async (req, res) => {
  const id = req.params.contact_id;

  let result = await searchContact.findContactById(id);
  let response = processFetchResponse(result);

  res.status(response.status).json(response);
};

module.exports = getContactById;
