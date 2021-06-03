const createQueryResponse = require("../createQueryResponse");
const { verifyCode } = require("../scramble");

const PendingEmail = require("../../db/models/PendingEmail");
// let result = { err: null, data: null };
const findById = async (id) => {
  try {
    const pendingEmail = await PendingEmail.findById(id);
    return createQueryResponse.getResponse(false, pendingEmail, null);
  } catch (err) {
    return createQueryResponse.getResponse(true, null, err);
  }
};

const findByEmailAndCode = async (email, email_confirmation_code) => {
  let pendingEmailSearchResult;
  const filter = {
    email: email,
    // confirmation_code: email_confirmation_code,
  };
  const projection = [];
  const options = {};

  try {
    pendingEmailSearchResult = await PendingEmail.findOne(
      filter,
      projection,
      options
    );
    if (!pendingEmailSearchResult) {
      return createQueryResponse.doesNotExist(true);
    }
  } catch (err) {
    return createQueryResponse.getResponse(true, null, err);
  }
  // console.log(pendingEmailSearchResult);

  let hash = pendingEmailSearchResult.confirmation_code;

  const verifyResult = verifyCode(email_confirmation_code, hash);

  if (verifyResult) {
    return createQueryResponse.getResponse(
      false,
      pendingEmailSearchResult,
      null
    );
  } else {
    return createQueryResponse.getResponse(true, null, "code mismatch");
  }
};

module.exports = { findById, findByEmailAndCode };
