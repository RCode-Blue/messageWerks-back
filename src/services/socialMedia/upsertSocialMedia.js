const SocialMedia = require("../../db/models/SocialMedia");
const checkMongoId = require("../checkMongoId");

const checkPrincipal = require("../../services/socialMedia/checkPrincipal");
const checkUserIds = require("../../services/users/checkUserIds");

const upsertSocialMedia = async (socialMedia) => {
  const checkSocialMedia = async (testResults) => {
    let mdbUsers = [];
    let mdbBusinesses = [];

    testResult.updates.forEach(async (i) => {
      if ("userAccount" in socialMedia[i].principal) {
        mdbUsers.push(socialMedia[i].principal.userAccount);
      } else if ("businessAccount" in socialMedia[i].principal) {
        mdbBusinesses.push(socialMedia[i].principal.businessAccount);
      }
    });
    return await checkUserIds(mdbUsers.concat(mdbBusinesses));
  };

  let status = 400;
  let testResult, testData, areAccountsLegit;

  testResult = await checkPrincipal(socialMedia);
  if (testResult.errors.length > 0) {
    testData = testResult;
    return { status, testData };
  }

  areAccountsLegit = await checkSocialMedia(testResult);

  if (areAccountsLegit.includes(false)) {
    testData = { AccountErrs: [...areAccountsLegit] };
    return { status, testData };
  }
  return testResult;
};

module.exports = upsertSocialMedia;
