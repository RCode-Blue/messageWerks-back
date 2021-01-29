const EmailBody = require("../../db/models/EmailBody");
const findBusinesses = require("../business/findBusinesses");

const createNewEmailBody = async (data) => {
  const { business, name, body } = data;
  let newBody, email_body_id, foundBusiness, updatedBusiness;
  let result = {
    emailBody: {
      err: null,
      doc: null,
    },
    business: {
      err: null,
      doc: null,
    },
  };

  newBody = {
    business,
    email_body_id,
    name,
    body,
  };

  email_body_id =
    name.replace(/[^a-zA-Z]/g, "").substring(0, 4) +
    Math.floor(Math.random() * 1000 + 1).toString();
  newBody.email_body_id = email_body_id;

  if (data.description) {
    newBody.description = data.description;
  }

  try {
    result.emailBody.doc = await EmailBody.create(newBody);
  } catch (err) {
    result.emailBody.err = err;
  }

  // console.log(result);
  // console.log(result.emailBody.doc.id);

  if (result.emailBody.err) {
    return result;
  }

  foundBusiness = (await findBusinesses.byId(business)).docs;

  // console.log(foundBusiness);
  try {
    if (!foundBusiness.email_bodies) {
      foundBusiness.email_bodies = result.emailBody.doc.id;
      updatedBusiness = await foundBusiness.save();
    } else {
      await foundBusiness.email_bodies.push(result.emailBody.doc.id);
      updatedBusiness = await foundBusiness.save();
    }
    result.business.doc = updatedBusiness;
  } catch (err) {
    result.business.err = err;
  }
  // console.log(result);
  return result;
};

module.exports = createNewEmailBody;
