const createPendingEmail = require("../../../../services/pendingEmail/createPendingEmail");

const postPendingEmail = async (req, res) => {
  let response;

  const email = req.body.email;
  let result = createPendingEmail(email);
};
