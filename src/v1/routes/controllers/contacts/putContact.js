/**
 * @description Controller - Handles PUT request for a contact
 *
 * @module
 * @name putContact
 *
 * @requires updateContact
 *
 * @param {object} req - Request object
 * @param {string} req.userId - ID of logfged in user
 * @param {string} req.acl_role - Logged-in user role
 * @param {string} req.params.contact_id - ID ofContact
 * @param {object} res - Response object
 *
 * @returns {responseTemplate} res - Response object
 */

const updateContact = require("../../../services/contact/updateContact");

const putContact = async (req, res) => {
  const { userId, acl_role } = req;
  const id = req.params.contact_id;
  const data = req.body;

  let response = await updateContact(data, id);
  res.status(response.status).json(response);
};

module.exports = putContact;
