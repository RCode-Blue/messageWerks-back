const jsonResponse = require("../../../services/v1/createJsonResponse");
const buildSubscriptionConfirmation = require("../../../services/_old/emailrequest/buildSubscriptionConfirmation");

const handleGetBusiness = require("../email/handleGetBusiness");
const handleSearchContact = require("../email/handleSearchContact");
const handleCreateContact = require("../email/handleCreateContact");
const handleCheckSubscriber = require("../email/handleCheckSubscriber");
const handleCreateSubscriber = require("../email/handleCreateSubscriber");
const sendEmail = require("../../../services/_old/emailrequest/sendEmail");

const postSubscriber = async (req, res) => {
  const { email, business_id } = req.body;
  let foundContact,
    subscriberContact,
    foundBusiness,
    newSubscriber,
    emailRequest,
    response;

  // Get business
  foundBusiness = await handleGetBusiness(req, res);
  if (!foundBusiness) {
    return;
  }

  // #region  Contact
  // Check if email is already a contact
  foundContact = await handleSearchContact(req, res);
  if (foundContact === false) {
    return;
  }

  //  If not already a contact, create new contact
  if (foundContact === "404") {
    subscriberContact = await handleCreateContact(req, res);
  }

  if (foundContact) {
    subscriberContact = foundContact;
  }
  // #endregion

  // Check if subscriber exists
  // If already a Contact, check if contact is already subscribed to this business
  // If not already subscribed, create new subscriber

  // Subscriber
  if (subscriberContact) {
    // Check if subscriber
    let checkSubscriberResult = await handleCheckSubscriber(
      req,
      res,
      subscriberContact._id,
      foundBusiness._id
    );

    // Subscriber exists
    if (checkSubscriberResult === false) {
      return;
    }

    // Subscriber does not exist
    if (checkSubscriberResult === "404") {
      // Create subscriber
      let createSubscriberResult = await handleCreateSubscriber(
        req,
        res,
        subscriberContact._id,
        foundBusiness._id
      );
      if (createSubscriberResult === false) {
        return;
      }
      newSubscriber = createSubscriberResult;

      if (createSubscriberResult === false) {
        return;
      }
    }
  }

  // #region email body
  // Generate subscription confirmation email
  let bizId = foundBusiness._id;
  let data = {
    type: "subscription_confirmation",
    businessid: bizId,
    toEmail: subscriberContact.email,
    isSandbox: true,
  };

  let emailBuildResult = await buildSubscriptionConfirmation(data);

  if (
    !emailBuildResult.err &&
    !emailBuildResult.doc &&
    !emailBuildResult.emailRequest
  ) {
    response = jsonResponse("404", "Message template not found");
    return res.status(response.status).json(response);
  }
  if (emailBuildResult.err) {
    response = jsonResponse(
      "400",
      "Error finding message template",
      emailBuildResult.err
    );
    return res.status(response.status).json(status);
  }
  emailRequest = emailBuildResult.emailRequest;
  // #endregion

  // #region Send email
  let sendEmailResult = sendEmail(emailRequest);
  if (sendEmailResult.err) {
    response = jsonResponse("400", "Error sending email", sendEmailResult.err);
    return res.status(response.status).json(response);
  }
  response = jsonResponse(
    "200",
    "Successfully sent email",
    sendEmailResult.data
  );
  return res.status(response.status).json(response);
  // #endregion
};

module.exports = postSubscriber;
