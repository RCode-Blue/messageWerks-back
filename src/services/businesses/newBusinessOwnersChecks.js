const checkDups = require("../checkdups");
const checkMongoId = require("../checkMongoId");
const checkUserIds = require("../users/checkUserIds");

// Check if all ID numbers are valid
const checkAllValid = (array) => array.every((val) => val === true);

const newBusinessChecks = async (owners) => {
  let idValidity = []; // array of valid / invalid user ids
  let result = {
    status: null,
    status_name: null,
    message: null,
    details: {
      id_validity: null,
      id_exists: null,
      id_duplicates: null,
    },
  };

  let allValidPass = false; // Indicates if all validity criteria are met.

  // Check if all user ids are valid
  owners.forEach((id) => {
    idValidity.push(checkMongoId(id));
  });
  let allIdsValid = checkAllValid(idValidity);

  allIdsValid === true ? (allValidPass = true) : (allValidPass = false);

  if (!allValidPass) {
    result.status = 400;
    (result.status_name = "Bad Request"),
      (result.details.id_validity = allIdsValid);
    result.message = "Invalid entries";
    return result;
  }

  // Check if user ids actually exist
  idExists = await checkUserIds(owners);
  let allIdsExist = checkAllValid(idExists);

  allIdsExist === true ? (allValidPass = true) : (allValidPass = false);

  if (!allValidPass) {
    result.status = 404;
    result.status_name = "Not Found";
    result.details.id_exists = idExists;
    result.message = "One or more users not found";
    return result;
  }

  // Check for duplicate entries
  let duplicates = checkDups(owners);
  duplicates.length === 0 ? (allValidPass = true) : (allValidPass = false);

  if (!allValidPass) {
    result.status = 400;
    result.status_name = "Bad Request";
    result.details.id_duplicates = duplicates;
    result.message = "Duplicate entries found";
    return result;
  }

  // No errors
  result.status = 200;
  result.status_name = "OK";
  result.message = "Success";
  return result;
};

module.exports = newBusinessChecks;
