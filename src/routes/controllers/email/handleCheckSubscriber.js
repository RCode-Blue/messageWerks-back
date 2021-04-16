const jsonResponse = require("../../../services/createJsonResponse");
const findSubscribers = require("../../../services/subscriber/findSubscribers");

const handleCheckSubscriber = async (
  req,
  res,
  subscriberContactId,
  foundBusinessId
) => {
  let response;

  // Check if Subscriber
  try {
    // throw { err: "ERROR Test" };
    let findSubscriberResult = await findSubscribers.bySubscription(
      subscriberContactId,
      foundBusinessId
    );
    // console.log("findSubscriberResult: ", findSubscriberResult);
    if (!findSubscriberResult.docs) {
      response = jsonResponse("404", "Subscriber not found");
      // res.status(response.status).json(response);
      return "404";
    }
    if (findSubscriberResult.docs) {
      response = jsonResponse(
        "200",
        "Subscriber found",
        findSubscriberResult.docs
      );
      return findSubscriberResult.docs;
    }
  } catch (err) {
    response = jsonResponse("400", "Error finding subscriber", err);
    res.status(response.status).json(response);
    return false;
  }

  res.status(response.status).json(response);
  return false;

  return true;
};

module.exports = handleCheckSubscriber;
