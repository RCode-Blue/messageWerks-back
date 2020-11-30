const findUser = require("../../../services/users/findUser");

const putDetails = async (req, res) => {
  const { email, newemail, newname } = req.body;

  let user = await findUser.byEmail({ email });
  if (!user) {
    return res.status(400).json({ errors: [{ msg: "user not found" }] });
  }

  if (await findUser.byEmail({ newemail })) {
    return (
      res.status(400), json({ errors: [{ msg: "new email already in use" }] })
    );
  }

  user.email = newemail;
  user.name.firstname = newname.newfirstname;
  user.name.middlename = newname.newmiddlename;
  user.name.familyname = newname.newfamilyname;

  try {
    await user.save();
    console.log(user);
    res.json(user);
  } catch {
    res.status(500).send("Server error");
  }
};

module.exports = putDetails;
