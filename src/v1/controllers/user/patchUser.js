/**
 * @description Handles PATCH requests for a User.
 * <br> Edits existing user data, except for password.
 * <br> User is located based on uuid.
 *
 * @module
 * @name patchUser
 * @requires jsonResponse
 * @param {object} User - User data
 * @param {string} [User.email] - User email
 * @param {string} [User.uuid] - User uuid
 * @param {integer} [User.role] - User role
 * @param {string} [User.first_name] - User first name
 * @param {string} [User.last_name ] - User last name
 *
 * @returns {jsonResponse} Standardised JSON object
 */

const User = require("../../../models").user;

const findBusiness = require("../business/findBusiness");
const findUser = require("./findUser");
const jsonResponse = require("../../../helpers/jsonResponse");

const editUser = async (userData) => {
  const { uuid } = userData;
  delete userData.uuid;
  if (userData.password) {
    delete userData.password;
  }
  let response;
  try {
    await User.sync();
    let result = await User.update(userData, {
      where: { uuid },
      returning: true,
    });
    response = jsonResponse(200, "", result);
  } catch (error) {
    response = jsonResponse(400, "", "", { error });
  }

  return response;
};

const linkBusiness = async (linkData) => {
  let user, business, response;
  const { user_uuid, business_uuid, transactionType } = linkData;
  // Note: transactions can be either "add" or "remove"

  let userSearchResult = await findUser.byUuid(user_uuid);

  if (userSearchResult.status >= 400) {
    response = { ...userSearchResult };
  } else {
    user = userSearchResult.data;
    let businessSearchResult = await findBusiness.byUuid(business_uuid);
    if (businessSearchResult.status >= 400) {
      response = { ...businessSearchResult };
    } else {
      business = businessSearchResult.data;
      try {
        if (transactionType === "add") {
          let linkResult = await user.addBusinesses(business);
          response = jsonResponse(200, "", linkResult);
        } else if (transactionType === "remove") {
          let linkResult = await user.removeBusinesses(business);
          response = jsonResponse(200, "", linkResult);
        }
      } catch (error) {
        response = jsonResponse(400, "", "", { error });
      }
    }
  }

  return response;
};

module.exports = { editUser, linkBusiness };
