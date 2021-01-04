const Contact = require("../../../db/models/Contact");
const jsonResponse = require("../../../services/createJsonResponse");

const getAllContacts = async (req, res) => {
  let response;
  try {
    const allContacts = await Contact.find({})
      .limit(10)
      .populate("socialMedia", "address");

    response = jsonResponse("200", "Success", allContacts);
  } catch (err) {
    response = jsonResponse("400", "Error", err);
  }
  res.status(response.status).json(response);
};

module.exports = getAllContacts;
