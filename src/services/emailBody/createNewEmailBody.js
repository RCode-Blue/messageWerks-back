const EmailBody = require("../../db/models/EmailBody");
const findBusinesses = require("../business/findBusinesses");

const createNewEmailBody = async (data) => {
  const { business_id, name, description, status, type } = data;
  let newBody, emailbody_codename, foundBusiness, updatedBusiness;
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

  emailbody_codename =
    name.replace(/[^a-zA-Z]/g, "").substring(0, 4) +
    Math.floor(Math.random() * 1000000 + 1).toString();

  // Find business object ID
  foundBusiness = (await findBusinesses.byBusinessId(business_id)).docs;
  if (!foundBusiness) {
    result.business.err = true;
    return result;
  }
  if (foundBusiness.err) {
    result.business.err = foundBusiness.err;
    return result;
  }

  newBody = {
    business: foundBusiness._id,
    emailbody_codename,
    status,
    name,
    type,
    total_use: 0,
  };

  if (data.description) {
    newBody.description = data.description;
  }

  if (data.html_part) {
    newBody.html_part = data.html_part;
  } else {
    newBody.text_part = data.text_part;
  }

  try {
    result.emailBody.doc = await EmailBody.create(newBody);
  } catch (err) {
    result.emailBody.err = err;
  }

  if (result.emailBody.err) {
    return result;
  }

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
    return result;
  }

  return result;
};

module.exports = createNewEmailBody;
