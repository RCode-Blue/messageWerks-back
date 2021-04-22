const Subscriber = require("../../db/models/Subscriber");
// const connectMongo = require("../../config/scripts/mongo");

const codeScript = require("../codeUtils");

const createNewSubscriber = async (contactid, businessid) => {
  let confirmation;
  let result = {
    data: null,
    err: null,
  };

  // let mongoDB = await connectMongo();
  // console.log(mongoDB);
  // mongoDB.on('open', function(){

  // })

  confirmation = await codeScript.setCode();
  console.log("createNewSubscriber: 20");
  // console.log(confirmation);

  let data = {
    contact: contactid,
    business: businessid,
    status: 7,
    confirmation_code: confirmation.hash,
  };

  try {
    result.data = await Subscriber.create(data);
  } catch (err) {
    result.err = err;
  }

  return result;
};

module.exports = createNewSubscriber;
