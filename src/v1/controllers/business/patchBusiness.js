const Business = require("../../../models").business;

const jsonResponse = require("../../../helpers/jsonResponse");

const editBusiness = async (businessData) => {
  const { uuid } = businessData;

  console.log("data: ", businessData);

  delete businessData.uuid;
  let response;
  try {
    await Business.sync();
    let result = await Business.update(businessData, {
      where: { uuid },
      returning: true,
    });
    response = jsonResponse(200, "", result);
  } catch (error) {
    response = jsonResponse(400, "", "", { error });
  }
  return response;
};

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
