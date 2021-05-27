const findBusinesses = require("./findBusinesses");

const editBusinessFields = async (id, fields) => {
  let searchResult = await findBusinesses.byId(id);
  let business = searchResult.docs;
  let results = {};

  const editField = async (document, fieldName, value) => {
    let result = { [fieldName]: { docs: null, error: null } };
    try {
      document[fieldName] = value;
      let newDoc = await document.save();
      result[fieldName].docs = newDoc[fieldName];
    } catch (err) {
      result[fieldName].error = err;
    }
    let key = Object.keys(result)[0];
    let newValue = Object.values(result)[0];
    return { key, newValue };
  };

  if (fields.name) {
    let result = await editField(business, "name", fields.name);
    results[result.key] = result.newValue;
  }

  if (fields.homepage) {
    let result = await editField(business, "homepage", fields.homepage);
    results[result.key] = result.newValue;
  }

  if (fields.status) {
    let result = await editField(business, "status", fields.status);
    results[result.key] = result.newValue;
  }

  if (fields.api_key) {
    let result = await editField(business, "api_key", fields.api_key);
    results[result.key] = result.newValue;
  }

  if (fields.social_media) {
    let result = await editField(business, "social_media", fields.social_media);
    results[result.key] = result.newValue;
  }

  if (fields.locations) {
    let result = await editField(business, "locations", fields.locations);
    results[result.key] = result.newValue;
  }

  if (fields.managers) {
    let result = await editField(business, "managers", fields.managers);
    results[result.key] = result.newValue;
  }

  return results;
};
module.exports = editBusinessFields;
