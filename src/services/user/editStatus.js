const appValues = require("../../config/appValues.json");
const findUser = require("./searchUser");
const jsonResponse = require("../v1/createJsonResponse");

const editStatus = async (id, status) => {
  let response;
  let allowed = 0;
  const allowed_status = appValues.user_status;

  allowed_status.forEach((item) => {
    if (status === item) {
      allowed++;
    }
  });

  if (allowed === 0) {
    response = jsonResponse("400", "Value not allowed");
  } else {
    let user = findUser.byUserId(id);
    try {
      user.status = status;
      await (await user).save();
      response = jsonResponse("200", "Successfully updated status", user);
    } catch (err) {
      response = jsonResponse("500", "Error saving changes");
    }
  }
  return response;
};

module.exports = editStatus;
