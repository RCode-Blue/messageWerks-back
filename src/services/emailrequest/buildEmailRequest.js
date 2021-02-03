const findBusinesses = require("../../services/business/findBusinesses");
const findEmailBody = require("../../services/emailBody/findEmailBody");
const appValues = require("../../config/appValues.json");
const jsonResponse = require("../../services/createJsonResponse");

// const MailJet = require("node-mailjet");

const verifyEmailType = (type) => {
  const emailTypes = appValues.email_bodies.types;
  let validCount = 0;
  emailTypes.forEach((element) => {
    if (element === type) {
      validCount++;
    }
  });

  return validCount === 1 ? true : false;
};

const buildEmailRequest = async (data) => {
  const {
    type,
    business_id,
    toEmail,
    toName,
    subject,
    htmlPart,
    variables,
  } = data;
  // console.log(variables);
  const mjPubKey = process.env.MJ_API_KEY;
  const mjPrivKey = process.env.MJ_SECRET_KEY;
  const defaultFrom = appValues.email_bodies.default_from;
  let response, result, emailRequest, message;

  // Check if email type is valid
  if (!verifyEmailType(type)) {
    response = jsonResponse("400", "Invalid email type", type);
    return res.status(response.status).json(response);
  }

  // Get id of Business document from business_id
  let foundBusiness = await findBusinesses.byBusinessId(business_id);

  message = [
    {
      From: {
        Email: defaultFrom.email,
        Name: defaultFrom.name,
      },

      To: [
        {
          Email: toEmail,
          Name: toName,
        },
      ],
      Subject: subject,
      HtmlPart: htmlPart,
      Variables: variables,
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

module.exports = buildEmailRequest;
