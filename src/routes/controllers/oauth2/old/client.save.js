const { google } = require("googleapis");

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectUrl = process.env.GOOGLE_REDIRECT_URL;

const client = () => {
  // Create oAuth2 client
  const oAuth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUrl
  );

  // All requests made with this object will use these settings unless overridden.
  // google.options({ auth: oAuth2Client });
  return { auth: oAuth2Client };
};

module.exports = client;
