const Subscriber = require("../../db/models/Subscriber");
// const connectMongo = require("../../config/scripts/mongo")

// let filter
let result = {
  err: null,
  docs: null,
};

const bySubscription = async (contact, business) => {
  // console.log("contact: ", contact);
  // console.log("business: ", business);
  // business = object ID
  let filter = {
    contact: contact,
    business: business,
  };

  try {
    let searchResult = await Subscriber.findOne(filter);
    result.docs = searchResult;
    // console.log(searchResult);
  } catch (err) {
    result.err = err;
  }

  return result;
};

const byEmail = (email) => {
  let searchResult = Subscriber - find({ email: email });
  if (searchResult.err) {
    result.err = searchResult.err;
  } else if (searchResult.docs.length === 0) {
    result.docs = null;
  } else {
    result.docs = searchResult.docs;
  }
  return result;
};

const byBusiness = (business) => {
  let searchResult = Subscriber - find({ business: business });
  if (searchResult.err) {
    result.err = searchResult.err;
  } else if (searchResult.docs.length === 0) {
    result.docs = null;
  } else {
    result.docs = searchResult.docs;
  }
  return result;
};

// const checkExists

module.exports = { bySubscription, byEmail, byBusiness };
