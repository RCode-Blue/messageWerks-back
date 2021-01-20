const { google } = require("googleapis");
const appValues = require("../../config/appValues.json");

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleRedirectUrl = process.env.GOOGLE_REDIRECT_URL;

const scopes = appValues.google.scopes;

const authorize = () => {
  const oAuthClient = new google.auth.OAuth2(
    googleClientId,
    googleClientSecret,
    googleRedirectUrl
  );

  const url = oAuthClient.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });

  return url;
};

module.exports = authorize;
