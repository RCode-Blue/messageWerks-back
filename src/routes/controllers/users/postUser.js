const checkRolePermissions = require("../../../services/user/checkRolePermissions");
const createUser = require("../../../services/user/createUser");
const fetchContactId = require("../../../services/contact/fetchContactId");
const findUser = require("../../../services/user/searchUser");
const jsonResponse = require("../../../services/createJsonResponse");

const postUser = async (req, res) => {
  const { userId, acl_role } = req;
  const minRole = "all_admins";
  let response;

  const data = req.body;
  // response = checkRolePermissions(acl_role, minRole);
  // if (response) {
  //   return res.status(response.status).json(response);
  // }

  // Check if Contact exists
  const searchResult = await fetchContactId(data);

  if (!searchResult.contact) {
    response = jsonResponse("404", "Contact not found");
    return res.status(response.status).json(response);
  }
  if (searchResult.err) {
    response = jsonResponse("400", "Error finding contact");
    return res.status(response.status).json(response);
  }

  let contactId = searchResult.contact.id;

  // Check if Contact is already assigned to a User
  let foundUser = await findUser.byContactId(contactId);
  if (foundUser.docs) {
    response = jsonResponse("400", "Contact already assigned to user");
    return res.status(response.status).json(response);
  }

  // Create user
  data.contact_id = contactId;
  let result = await createUser(data);
  if (result.err) {
    response = jsonResponse("400", "Error creating user", response.err);
  } else {
    response = jsonResponse("200", "Success", result.doc);
  }
  res.status(response.status).json(response);
};

module.exports = postUser;
