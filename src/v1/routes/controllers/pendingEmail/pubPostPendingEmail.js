/**
 * @description Creates new PendingEmail, then generates and sends confirmation email
 * @module
 * @name pubPostPendingEmail
 *
 */

const createPendingEmail = require("../../../services/pendingEmail/createPendingEmail");
const createPendingConfirmHome = require("../../../services/emailRequest/createPendingConfirmHome");

const pubPostPendingEmail = async (req, res) => {
  const { contact_email, contact_name } = req.body;
  let response, result;

  // -- Create new Pending Email- with confirmation code, hash and email, with expiry --
  let createPendingResult = await createPendingEmail(contact_email);
  if (createPendingResult.status === 400) {
    return res.status(createPendingResult.status).json(createPendingResult);
  }
  const { confirmation_code, hash } = createPendingResult.data;

  // -- Generate confirmation email --
  let data = {
    to: {
      email: contact_email,
      name: contact_name,
    },
    confirmation_code,
    hash,
  };

  response = await createPendingConfirmHome(data);

  res.status(response.status).json(response);
};

module.exports = pubPostPendingEmail;
