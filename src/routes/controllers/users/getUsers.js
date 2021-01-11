const jsonTemplate = require("../../../services/createJsonResponse");

const fetchUsers = require("../../../services/user/fetchUsers");

const getUsers = async (req, res) => {
  let response;

  const filter = {};
  const projection = {};
  const options = {
    populate: "contact",
  };

  let result = await fetchUsers(filter, projection, options);

  if (!result.err || result.result.doc.length < 1) {
    response = jsonTemplate("400", "Error retrieving Users", result.err);
  }
  response = jsonTemplate("200", "Successfuly retrieved Users", result.doc);

  res.status(response.status).json(response);
};
module.exports = getUsers;
