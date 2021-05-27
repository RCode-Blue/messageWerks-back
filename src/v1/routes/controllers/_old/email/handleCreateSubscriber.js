const jsonResponse = require("../../../services/v1/createJsonResponse");
const createNewSubscriber = require("../../../services/subscriber/createNewSubscriber");

const handleCreateSubscriber = async (
  req,
  res,
  subscriberContactId,
  foundBusinessId
) => {
  let response;
  try {
    let createSubscriberResult = await createNewSubscriber(
      subscriberContactId,
      foundBusinessId
    );
    // console.log("_createSubscriberResult: ", createSubscriberResult);

    response = jsonResponse(
      "200",
      "Subscriber successfully created",
      createSubscriberResult.data
    );
    // res.status(response.status).json(response);
    return createSubscriberResult.data;
  } catch (err) {
    console.log(err);
    response = jsonResponse("400", "Error creating subscriber", err);
    res.status(response.status).json(response);
    return false;
  }
};
module.exports = handleCreateSubscriber;
