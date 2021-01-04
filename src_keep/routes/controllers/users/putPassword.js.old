const User = require("../../../db/models/User");

const findUser = require("../../../services/users/findUser");
const encrypt = require("../../../services/encrypt");

const putPassword = async (req, res) => {
  console.log(req.user);

  const { password1, password2, email } = req.body;

  // Check if repeated passwords are same
  if (password1 !== password2) {
    return res.status(400).json({ errors: [{ msg: "passwords don't match" }] });
  }

  try {
    // let user = await findUser.byEmail({ email });
    let user = await findUser.byUserId(req.user.id);
    const encryptedPassword = await encrypt(password1);

    console.log(user);

    user.password = encryptedPassword;
    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = putPassword;
