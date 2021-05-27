const appRoot = require("app-root-path");

const buildEmailMessage = require("./buildEmailMessage");
const createJsonResponse = require(appRoot +
  "/src/v1/services/createJsonResponse");
const mailjet = require("node-mailjet");

const buildEmailRequest = async (data) => {
  // console.log(data);
  // console.log(appRoot.path + "/src/v1/services");
  const pubKey = process.env.MJ_API_KEY;
  const privKey = process.env.MJ_SECRET_KEY;

  const mailConnect = await mailjet.connect(pubKey, privKey);

  let requestResult;

  const request = mailConnect
    .post("send", { version: "v3.1" })
    .request({ Messages: data });

  // console.log(request);

  await request
    .then((result) => {
      requestResult = createJsonResponse("200", "Success", result);
      // console.log(result.body);
      // console.log(result.body.Messages[0]);
      // return requestResult;
    })
    .catch((err) => {
      // console.error(err.statusCode);
      requestResult = createJsonResponse(
        "500",
        "Failed to create email request",
        err
      );
      // return requestResult;
    });

  // console.log(requestResult);
  return requestResult;
};

module.exports = buildEmailRequest;
