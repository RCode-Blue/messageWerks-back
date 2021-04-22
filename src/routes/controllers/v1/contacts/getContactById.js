// const checkRolePermissions = require("../../../../services/user/checkRolePermissions");
const searchContact = require("../../../../services/v1/contact/searchContacts");

/**
 * @description Gets a Contact by ID
 *
 * @module
 * @name getContactById
 *
 * @requires checkRolePermissions
 * @requires processFetchResponse
 * @requires searchContact
 *
 * @param {object} req Request object
 * @param {string} req.params.contact_id contact ID
 * @param {object} res Response object
 *
 * @returns response - Refer Type Definitions
 * @property {string} response.result._id Contact ID
 * @property {string} response.result.email Contact email
 * @property {string} response.result.social_media Contact Social Media accounts
 */
const getContactById = async (req, res) => {
  const minRole = "all_admins";

  // const { acl_role } = req;
  const id = req.params.contact_id;

  let response;

  // response = checkRolePermissions(acl_role, minRole);

  // if (response) {
  //   return res.status(response.status).json(response);
  // }

  response = await searchContact.byId(id);

  res.status(response.status).json(response);
};

module.exports = getContactById;
