const Subscriber = require("../../db/models/Subscriber");

const findBusinesses = require("../business/findBusinesses");
const searchContact = require("../contact/searchContact");

const createNewSubscriber = async (email, business_id) => {
  let contact, business;
  let result = {
    data: null,
    err: null,
  };

  let contactSearch = searchContact.findContactByEmail(email);
  if (contactSearch.err) {
    result.err = contactSearch.err;
    return result;
  }
  contact = contactSearch.docs;

  // let businessSearch =
};

module.exports = createNewSubscriber;
