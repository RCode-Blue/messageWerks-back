const {
  google,
} = require("../../../../services/oauth/node_modules/googleapis");

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectUrl = process.env.GOOGLE_REDIRECT_URL;

const appValues = require("../../../config/appValues.json");
const googleConfig = appValues.google;

const authenticate = async () => {
  const oAuth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUrl
  );

  google.options({ auth: oAuth2Client });

  return new Promise((resolve, reject) => {
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: googleConfig.scopes,
    });

    const server = http.createServer(async (req, res) => {
      try {
        if (req.url.indexOf("/oauth2callback") > -1) {
          const qs = new url.URL(req.url, "http://localhost:3000").searchParams;
          res.end("Authentication successful");
          server.destroy();
          const { tokens } = await oAuth2Client.getToken(qs.get("code"));
          oAuth2Client.credentials = tokens;
          resolve(oAuth2Client);
        }
      } catch (err) {
        reject(e);
      }
    });
  });
};

module.exports = authenticate;
