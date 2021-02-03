const buildEmailRequest = require("../../../services/emailrequest/buildEmailRequest");

const sendEmailFromFile = async (req, res) => {
  await buildEmailRequest(req.body);
  res.send("Create email");
};

module.exports = sendEmailFromFile;
