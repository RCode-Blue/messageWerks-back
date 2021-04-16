const searchContact = require("../../../services/contact/searchContact");
const jsonResponse = require("../../../services/createJsonResponse");

const handleSearchContact = async (req, res) => {
  const { email } = req.body;
  let foundContact, contactSearchResult;

  try {
    let contactSearchResult = await searchContact.findContactByEmail(email);

    if (!contactSearchResult.docs) {
      // response = jsonResponse("404", "Contact not found");
      // res.status(response.status).json(response);
      return "404";
    }
    foundContact = contactSearchResult.docs;
    // subscriberContact = foundContact;
    return foundContact;
  } catch (err) {
    response = jsonResponse("400", "Error searching email", err);
    res.status(response.status).json(response);
    return false;
  }
};

module.exports = handleSearchContact;
