/**
 * @description Creates new PendingEmail, then generates and sends confirmation email
 * @module
 * @name pubPostPendingEmail
 *
 */

/*
const checkRolePermissions = require("../../../services/user/checkRolePermissions");
const createUser = require("../../../services/user/createUser");
const fetchContactId = require("../../../services/contact/fetchContactId");
const findUser = require("../../../services/user/searchUser");
const jsonResponse = require("../../../services/v1/createJsonResponse");
*/

// const createContact = require("../../../../services/v1/contact/createContact")
const createPendingEmail = require("../../../services/pendingEmail/createPendingEmail");
const searchContact = require("../../../services/contact/searchContacts");
const createPendingConfirmHome = require("../../../services/emailRequest/createPendingConfirmHome");

const pubPostPendingEmail = async (req, res) => {
  const { contact_email, contact_name } = req.body;
  let response, result;

  // Create new entry with confirmation code, hash and email, with expiry
  let pendingResponse = await createPendingEmail(contact_email);
  if (pendingResponse.status === 400) {
    return res.status(pendingResponse.status).json(pendingResponse);
  }
  const { confirmation_code, hash } = pendingResponse.data;

  // Generate confirmation email
  let data = {
    to: {
      email: contact_email,
      name: contact_name,
    },
    confirmation_code,
    hash,
  };

  response = await createPendingConfirmHome(data);

  // console.log(response);

  // res.send("POST user");

  res.status(response.status).json(response);
};

module.exports = pubPostPendingEmail;
