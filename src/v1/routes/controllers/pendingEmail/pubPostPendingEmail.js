/**
 * @description Creates new PendingEmail item, then generates and sends confirmation email
 * @module
 * @name pubPostPendingEmail
 *
 * @requires createPendingEmail
 * @requires createPendingConfirmHome
 *
 * @param {object} req Request object
 * @param {string} req.contact_email Email of user
 * @param {string} req.contact_name Prospective user's email address
 * @param {object} res Response object
 *
 * @returns {responseTemplate} res - Response object
 * @property {object} res.data
 * @property {object} res.data.to
 * @property {string} res.data.to.email Recipient's email
 * @property {string} res.data.to.name Recipient's name
 * @property {string} res.data.confirmation_code Auto-generated confirmation string
 * @property {string} res.data.hash Hash of confirmation_code
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
