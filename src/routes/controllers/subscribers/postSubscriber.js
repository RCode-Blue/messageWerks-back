const createContact = require("../../../services/contact/createContact");
const findBusinesses = require("../../../services/business/findBusinesses");
const findSubscribers = require("../../../services/subscriber/findSubscribers");
const jsonResponse = require("../../../services/createJsonResponse");
const searchContact = require("../../../services/contact/searchContact");
const createNewSubscriber = require("../../../services/subscriber/createNewSubscriber");
const subscriptionConfirmation = require("../../../services/emailrequest/subscriptionConfirmation");

const postSubscriber = async (req, res) => {
  const { email, business_id } = req.body;
  let foundContact, subscriberContact, foundBusiness, newSubscriber, response;

  // #region Get business
  let businessSearchResult = await findBusinesses.byBusinessId(business_id);
  // console.log("businessSearchResult: ", businessSearchResult);
  if (businessSearchResult.err) {
    response = jsonResponse(
      "400",
      "Error searching business",
      businessSearchResult.err
    );
    return res.status(response.status).json(response);
  }

  if (!businessSearchResult.docs) {
    foundBusiness = null;
    response = jsonResponse("404", "Business not found");
    // console.log("response: ", response);
    return res.status(response.status).json(response);
  } else {
    foundBusiness = businessSearchResult.docs;
    // response = jsonResponse("200", "Business found", foundBusiness);
    // return res.status(response.status).json(response);
  }
  // console.log(foundBusiness);
  // #endregion

  // #region Check if email is already a contact
  let contactSearchResult = await searchContact.findContactByEmail(email);

  if (contactSearchResult.err) {
    response = jsonResponse(
      "400",
      "Error searching email",
      contactSearchResult.err
    );
    return res.status(response.status).json(response);
  } else if (!contactSearchResult.docs) {
    foundContact = null;
  } else {
    foundContact = contactSearchResult.docs;
    subscriberContact = foundContact;
  }

  // If not already a contact, create new contact
  if (!foundContact) {
    let result = await createContact({ email });

    if (result.err) {
      response = jsonRespone("400", "Error creating contact", result.err);
      return res.status(response.status).json(response);
    }
    subscriberContact = result.doc;
  }
  // #endregion

  // #region Check if subscriber exists
  // If already a Contact, check if contact is already subscribed to this business

  if (subscriberContact) {
    let result = await findSubscribers.bySubscription(
      subscriberContact._id,
      foundBusiness._id
    );
    // console.log(result);
    if (result.err) {
      response = jsonResponse("400", "Error finding subscriber", result.err);
      return res.status(response.status).json(response);
    } else if (result.docs) {
      response = jsonResponse("400", "Subscriber already exists", result.docs);
      return res.status(response.status).json(response);
    } else {
      // create subscriber
    }
  }

  // #endregion

  // #region Create subscriber
  let result = await createNewSubscriber(
    subscriberContact._id,
    foundBusiness._id
  );

  // console.log(result);
  if (result.err) {
    response = jsonResponse("400", "Error finding subscriber", result.err);
    return res.status(response.status).json(response);
  }
  response = jsonResponse("200", "Contact successfully completed", result.data);
  // return res.status(response.status).json(response);

  // #endregion

  // #region Generate subscription confirmation email
  // console.log("Found Business: ", foundBusiness);
  let bizId = foundBusiness._id;
  let data = {
    type: "subscription_confirmation",
    businessid: bizId,
    toEmail: subscriberContact.email,
  };

  await subscriptionConfirmation(data);

  // #endregion

  res.send("Create new subscriber");
};

module.exports = postSubscriber;
