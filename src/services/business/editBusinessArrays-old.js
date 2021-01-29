const searchBusinesses = require("./findBusinesses");
const searchContacts = require("../contact/searchContact");
// const searchAddress;
// const searchSocialMedia;

const editBusinessArray = async (id, arrays) => {
  let searchResult = await searchBusinesses.byId(id);
  let business = searchResult.docs;
  let results = { industry: null };

  if (arrays.industry) {
    // console.log(arrays.industry);
    // console.log(business.docs);

    try {
      business.industry = arrays.industry;
      let newDoc = await business.save();

      // console.log(newDoc.industry);

      results.industry = { docs: newDoc.industry };
    } catch (err) {
      results.industry = { error: err };
    }
    console.log("Results:", results);
  }
};

module.exports = editBusinessArray;
