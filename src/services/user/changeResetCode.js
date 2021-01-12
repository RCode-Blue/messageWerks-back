const User = require("../../db/models/User");
// const appValues = require('../../config/appValues.json')
const encrypt = require("../password/encrypt");
const findUser = require("./searchUser");
const jsonResponse = require("../createJsonResponse");

const changeResetCode = async (id, reset) => {
  let response;

  let user = await findUser.byUserId(id);
  if (!user) {
    response = jsonResponse("404", "User not found");
  }

  if (reset.reset_code) {
    // reset_code in req: set a reset code
    try {
      user.reset_code = code.reset_code;
      let doc = user.save();
      response = jsonResponse("200", "Successfully set reset code", doc);
    } catch (err) {
      response = jsonResponse("500", "Error setting reset code", err);
    }
  } else {
    try {
      user.reset_code = null;
      let doc = user.save();
      response = jsonResponse("200", "Successfully reset the reset code", doc);
    } catch (err) {
      response = jsonResponse("500", "Error resetting the reset code", err);
    }
  }

  // let result = await user.save();
  return response;
};

module.exports = changeResetCode;
