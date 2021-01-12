const createUser = require("../../../services/user/createUser");
const jsonResponse = require("../../../services/createJsonResponse");
const fetchContactId = require("../../../services/contact/fetchContactId");
const findUser = require("../../../services/user/searchUser");

const postUser = async (req, res) => {
  let response;

  const data = req.body;

  // Check if Contact exists
  const contact_id = await fetchContactId(data);

  // Check if Contact is already assigned to a User
  let contact = await findUser.byContactId(contact_id);
  if (contact) {
    response = jsonResponse("400", "Contact already assigned to user");
    return res.status(response.status).json(response);
  }

  // Create user
  data.contact = contact_id;
  let result = await createUser(data);
  console.log(result);
  if (result.err) {
    response = jsonResponse("400", "Error creating user", response.err);
  } else {
    response = jsonResponse("200", "Success", result.doc);
  }
  res.status(response.status).json(response);
};

module.exports = postUser;
