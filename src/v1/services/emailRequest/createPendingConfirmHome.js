const fs = require("fs");
const appRoot = require("app-root-path");
const mjml2html = require("mjml");

const appValues = require(appRoot + "/src/v1/config/appValues.json");
const buildEmailMessage = require("./buildEmailMessage");
const buildEmailRequest = require("./buildEmailRequest");
const createJsonResponse = require("../createJsonResponse");
const { createConfirmationCode } = require("../scramble");

const createPendingConfirmation = async (data) => {
  // console.log(data);

  const { to, confirmation_code, hash } = data;
  const home = appValues.email_bodies.html_templates.home;
  const version = appValues.codebase.version;

  const fileName = "home_pendingEmailConfirmation.mjml";
  const filePath = appRoot + home.directory + fileName;
  // console.log(filePath);

  const from_email = home.from_email;
  const homepage = process.env.HOMEPAGE;
  const subject = "Thanks for trying us out!";

  let htmlPart,
    mjmlPart,
    emailMessage,
    vars,
    messageVals,
    confirmationUrl,
    verifyUrl;

  verifyUrl = homepage + "/api/v1/pub/verify/email/";
  confirmationUrl = verifyUrl + ":" + confirmation_code;

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

  // let htm = `<h3>Confirmation code: {{var:confirmationcode}}</h3>`;

  messageVals = {
    from: { email: from_email, name: "" },
    to,
    subject,
    htmlPart,
    variables: vars,
  };
  // console.log(messageVals);

  emailMessage = await buildEmailMessage(messageVals);
  // console.log("---------------------------");
  // console.log(emailMessage);
  // console.log("---------------------------");

  // console.log(emailMessage[0]);

  // return createJsonResponse("200", "test", emailMessage);

  return await buildEmailRequest(emailMessage);

  // console.log(emsg);
  // return createJsonResponse("200", "test", emsg);
  // return emsg;
};

module.exports = createPendingConfirmation;
