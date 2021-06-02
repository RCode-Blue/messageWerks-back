const PendingEmail = require("../../db/models/PendingEmail");
const createDeleteResponse = require("../createDeleteResponse");

const removePendingEmail = async (id) => {
  console.log(`id: ${id}`);
  try {
    let removed = await PendingEmail.findOneAndDelete({ _id: id });
    // console.log("--- removed ---");
    // console.log(removed);
    // console.log("--------");

    return createDeleteResponse(null, removed);
  } catch (err) {
    return createDeleteResponse(true, null, err);
  }
};
module.exports = removePendingEmail;
