const findEmailBody = require("./findEmailBody");

const checkAllowedFields = (data) => {
  const allowedFields = [
    "name",
    "description",
    "subject",
    "html_part",
    "text_part",
    "variables",
    "notes",
  ];

  let allowed = 0;

  let childObjs = data.children;
  childObjs.forEach((elem) => {
    if (allowedFields.includes(elem)) {
      allowed++;
    }
  });

  return (allowed = data.length ? true : false);
};

const editEmailBody = async (codename, data) => {
  let result = {
    err: null,
    result: null,
    doc: null,
  };

  if (!checkAllowedFields(data)) {
    result.err = true;
    result.result = "Some fields not allowed";
    return result;
  }

  let searchResult = await findEmailBody.byEmailBodyId(codename);
  if (searchResult.err) {
    return searchResult;
  }

  let foundEmailBody = searchResult.doc;

  try {
    let updateResult = await foundEmailBody.updateOne(data);
    result.doc = updateResult;
  } catch (err) {
    result.err = err;
    return result;
  }
  result.doc = await findEmailBody.byId(foundEmailBody._id);

  return result;
};

module.exports = editEmailBody;
