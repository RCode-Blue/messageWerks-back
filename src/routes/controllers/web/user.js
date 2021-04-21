const appValues = require("../../../config/appValues.json");
const buildEmailRequest = require("../../../services/emailrequest/buildEmailRequest");
const createUser = require("../../../services/user/createUser");
const findBusinesses = require("../../../services/business/findBusinesses");
const findEmailBody = require("../../../services/emailBody/findEmailBody");
const jsonResponse = require("../../../services/v1/createJsonResponse");

const newUser = async (req, res) => {
  const {
    email,
    password1,
    password2,
    acl_role,
    status,
    contact_id,
  } = req.data;
  const { business } = appValues;
  const defaultBusiness = business.default_business_id;

  let response;

  if (password1 !== password2) {
    response = jsonResponse("400", "Passwords don't match");
    return res.status(response.status).json(response);
  }

  const userData = {
    password1,
    acl_role,
    status,
    contact_id,
  };
  let userResult = createUser(userData);

  if (userResult.err) {
    response = jsonResponse("400", "Error creating user", userResult.err);
    return res.status(response.status).json(response);
  }
  // else {
  //   response=jsonResponse("200", "Successfully created User", userResult.doc)
  // }

  // response = jsonResponse("200", "Successfully created User", userResult.doc);

  let emailBody = findEmailBody.byBusinessTypeActive(
    "contact_confirm",
    defaultBusiness
  );

  let emailData = {
    type: "contact_confirm",
    business_id: defaultBusiness,
    toEmail: email,
    subject: "Please confirm your email",
  };

  let emailRequestResult = buildEmailRequest;
};

const confirmUser = () => {};

const resetPassword = () => {};

module.exports = { newUser, confirmUser, resetPassword };
