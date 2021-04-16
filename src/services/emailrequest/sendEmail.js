const utils = require("./emailRequestUtils");

const sendEmail = async (emailRequest) => {
  // console.log("emailRequest: ", emailRequest);
  const values = utils.getValues();
  const { mjPubKey, mjPrivKey } = values;
  let result = {
    err: null,
    data: null,
  };

  const mailJet = require("node-mailjet").connect(mjPubKey, mjPrivKey);
  const request = mailJet
    .post("send", { version: "v3.1" })
    .request(emailRequest);

  request
    .then((result) => {
      console.log("result.body: ", result.body);
      result.data = result.body;
      return result;
    })
    .catch((err) => {
      console.error("result.err: ", err);
      result.err = err;
      return result;
    });
  // return result;
};

module.exports = sendEmail;
