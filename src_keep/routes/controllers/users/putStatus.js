const findUser = require("../../../services/users/findUser");

const putStatus = async (req, res) => {
  const { email, status, newstatus } = req.body;

  let user = await findUser.byEmail({ email });
  if (!user) {
    return res.status(400).json({ errors: [{ msg: "user not found" }] });
  }

  user.status = newstatus;

  try {
    await user.save();
    // console.log(user);
    res.json(user);
  } catch {
    res.status(500).send("Server error");
  }
};

module.exports = putStatus;
