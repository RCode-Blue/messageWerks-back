/**
 * @description
 */

const findUser = require("../../../services/users/findUser");

const jsonTemplates = require("../../../config/responseTemplates.json");

const putDetails = async (req, res) => {
  const { email, newemail, role } = req.body;
  let response;

  let user = await findUser.byEmail({ email });
  if (!user) {
    response = jsonTemplates._400;
    response.message = "User not found";
    return res.status(response.status).json(response);
  }

  if (await findUser.byEmail({ newemail })) {
    response = jsonTemplates._400;
    response.message = "Email already in use";
    return res.status(response.status), json(response);
  }

  user.email = newemail;
  user.role = newrole;

  try {
    await user.save();
    response = jsonTemplates._200;
    response.message = "Success";
    response.data = user;
    res.status(response.status).json(response);
  } catch {
    response = jsonTemplates._500;
    response.message = "Server error";
    res.status(response.status).json(response);
  }
};

module.exports = putDetails;
