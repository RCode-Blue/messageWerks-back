/**
 * @description Handles PATCH requests for a Business.
 * <br> Edits existing Business data, except for password.
 * <br> Business is located based on uuid.
 *
 * @module
 * @name patchUser
 */
const Business = require("../../../models").business;

const jsonResponse = require("../../../helpers/jsonResponse");

/**
 * @description Edits Business details
 *
 * @function
 * @name editBusiness
 * @requires jsonResponse
 * @param {object} businessData
 * @param {string} businessData.uuid - Business uuid
 * @param {integer} [businessData.address_line1] - Business address line 1
 * @param {string} [businessData.address_line2] - Business address line 2
 * @param {string} [businessData.suburb] - Business address suuburb
 * @param {string} [businessData.state] - Business address state
 * @param {string} [businessData.country] - Business address country
 * @param {string} [businessData.postcode] - Business address postcode
 */
const editBusiness = async (businessData) => {
  const { uuid } = businessData;
  delete businessData.uuid;
  let response;
  try {
    await Business.sync();
    let result = await Business.update(businessData, {
      where: { uuid },
      returning: true,
      plain: true,
    });
    // console.log("--- result: ", result);
    response = jsonResponse(200, "", result);
    // console.log("response: ", response);
  } catch (error) {
    response = jsonResponse(400, "", "", { error });
  }
  return response;
};

/**
 * @description Creates or removes a links between a Business and a User
 *
 * @function
 * @name linkUser
 * @param {object} linkData
 * @param {string} linkData.user_uuid - User's UUID
 * @param {string} linkData.business_uuid - UUID of business to be linked
 * @param {string} linkData.transactionType - Type of transaction (add or remove)
 */
const linkUser = async (linkData) => {
  let business, user, response;
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
          let linkResult = await business.addUser(user);
          response = jsonResponse(200, "", linkResult);
        } else if (transactionType === "remove") {
          let linkResult = await business.removeUser(user);
          response = jsonResponse(200, "", linkResult);
        }
      } catch (error) {
        response = jsonResponse(400, "", "", { error });
      }
    }
  }

  return response;
};

module.exports = { editBusiness, linkUser };
