const fs = require("fs");
const appRoot = require("app-root-path");
const mjml2html = require("mjml");

const appValues = require(appRoot + "/src/v1/config/appValues.json");
const buildEmailMessage = require("./buildEmailMessage");
const buildEmailRequest = require("./buildEmailRequest");
const createJsonResponse = require("../createJsonResponse");
// const { createConfirmationCode } = require("../scramble");

const createPendingConfirmation = async (data) => {
  const { to, confirmation_code, hash } = data;
  const to_email = to.email;
  const to_name = to.name;
  const home = appValues.email_bodies.html_templates.home;
  const version = appValues.codebase.version;

  const fileName = "home_pendingEmailConfirmation.mjml";
  const filePath = appRoot + home.directory + fileName;

  const from_email = home.from_email;
  const homepage = process.env.HOMEPAGE;
  const subject = "Thanks for trying us out!";

  let htmlPart, mjmlPart, emailMessage, vars, messageVals;

  const verifyUrl = homepage + "/api/v1/public/verify/email";
  const emailString = `email=${to_email}`;
  const confirmation_string = `email_confirmation_code=${confirmation_code}`;

  const confirmationUrl =
    verifyUrl + "/?" + emailString + "&" + confirmation_string;
  console.log(confirmationUrl);

  mjmlPart = fs.readFileSync(filePath, "utf-8", (err, data) => {
    if (err) {
      return createJsonResponse("500", "Failed to convert to HTML", err);
    }
  });
  htmlPart = mjml2html(mjmlPart).html;

  vars = {
    confirmation_code: confirmation_code,
    buttonUrl: confirmationUrl,
    confirmationUrl,
    verifyUrl: verifyUrl,
    homepageUrl: process.env.HOMEPAGE,
  };

  messageVals = {
    from: { email: from_email, name: "" },
    to,
    subject,
    htmlPart,
    variables: vars,
  };

  emailMessage = await buildEmailMessage(messageVals);

  return await buildEmailRequest(emailMessage);
};

module.exports = createPendingConfirmation;
