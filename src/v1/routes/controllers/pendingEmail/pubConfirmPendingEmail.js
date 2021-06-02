const createContact = require("../../../services/contact/createContact");
const removePendingEmail = require("../../../services/pendingEmail/removePendingEmail");
const {
  findByEmailAndCode,
} = require("../../../services/pendingEmail/searchPendingEmails");
const {
  checkContactEmailExists,
} = require("../../../services/contact/searchContacts");
const pubCreateUser = require("../../../services/user/pubCreateUser");

const pubConfirmPendingEmail = async (req, res) => {
  const { email, email_confirmation_code } = req.query;
  let deletePendingResult, findContactResult, findPendingResult, newContact;

  // 1: Check if Pending Email Exists
  findPendingResult = await findByEmailAndCode(email, email_confirmation_code);
  const pendingId = findPendingResult.data._id;

  if (findPendingResult.status >= 400) {
    return res.status(findPendingResult.status).json(findPendingResult);
  }

  // 2: Check if Contact exists
  findContactResult = await checkContactEmailExists(
    findPendingResult.data.email
  );
  if (findContactResult.status === 400) {
    return res.status(findContactResult.status).json(findContactResult);
  }

  // --- Not found - create new Contact ---
  else if (findContactResult.status === 404) {
    let contactResult = await createContact({ email });

    if (contactResult.status === 400) {
      return res.status(contactResult.status).json(contactResult);
    }
    newContact = contactResult.data;
  } else {
    newContact = findContactResult.data;
  }

  // 3: Create new User
  let createUserResult = await pubCreateUser({ contact: newContact._id });
  if (createUserResult.status !== 200) {
    return res.status(createUserResult.status).json(createUserResult.data);
  }

  // 4: Delete PendingEmail
  deletePendingResult = await removePendingEmail(pendingId);

  res.status(deletePendingResult.status).json(deletePendingResult);
};

module.exports = pubConfirmPendingEmail;
