// const EmailBody = require("../../db/models/EmailBody");
const utils = require("./emailRequestUtils");
const findEmailBody = require("../emailBody/findEmailBody");

const subscriptionConfirmation = async (data) => {
  const { type, businessid, toEmail } = data;
  const values = utils.getValues();
  const { mjPubKey, mjPrivKey, defaultFrom } = values;
  let emailBody, message, htmlPart, emailRequest;

  let result = {
    err: null,
    doc: null,
  };

  if (!utils.verifyEmailType(type)) {
    result.err = { status: 400, details: "Illegal email type" };
    return result;
  }

  try {
    emailBody = await findEmailBody.byBusinessTypeActive(type, businessid);
  } catch (err) {
    result.err = err;
    return result;
  }

  // console.log("email body: ", emailBody);

  htmlPart = emailBody.doc.html_part.replace(`\"`, `"`);
  htmlPart = htmlPart.replace(`<\/`, `</`);
  htmlPart = htmlPart.replace(`\/>`, `/>`);

  console.log("htmlPart: ", htmlPart);

  message = [
    {
      From: {
        Email: defaultFrom.email,
      },
      To: [
        {
          Email: toEmail,
        },
      ],
      Subject: emailBody.subject,
      HtmlPart: htmlPart,
      Variables: emailBody.variables,
    },
  ];

  emailRequest = {
    SandboxMode: false,
    Messages: message,
  };

  const mailJet = require("node-mailjet").connect(mjPubKey, mjPrivKey);
  const request = mailJet
    .post("send", { version: "v3.1" })
    .request(emailRequest);

  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = subscriptionConfirmation;
