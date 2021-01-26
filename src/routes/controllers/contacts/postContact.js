const checkRolePermissions = require("../../../services/user/checkRolePermissions");
const createContact = require("../../../services/contact/createContact");
const jsonResponse = require("../../../services/createJsonResponse");
const searchContact = require("../../../services/contact/searchContact");

const postContact = async (req, res) => {
  const { acl_role } = req;

  let response, result;
  const { findContactByEmail } = searchContact;
  const data = { email: req.body.email };

  response = checkRolePermissions(acl_role, 95);
  if (response) {
    return res.status(response.status).json(response);
  }
  // if (parseInt(acl_role) < 95) {
  //   response = jsonResponse(
  //     "401",
  //     "You do not have permission to perform this action"
  //   );
  //   return res.status(response.status).json(response);
  // }

  // Check if email already exists
  result = await findContactByEmail(req.body.email);

  if (result.docs && result.docs.length > 0) {
    response = jsonResponse("400", "Contact already exists", result.docs);
    return res.status(response.status).json(response);
  } else {
    result = null;
  }

  result = await createContact(data);

  response = result.err
    ? jsonResponse("400", "Error creating contact", { err: result.err })
    : jsonResponse("200", "Successfully created contact", {
        contact: result.doc,
      });

  return res.status(response.status).json(response);
};

module.exports = postContact;
