const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../db/models/User");

const login = async (req, res) => {
  const { email, password } = req.body;
  const errorMsg = "Invalid Credentials";
  // try {
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ errors: [{ msg: errorMsg }] });
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ errors: [{ msg: errorMsg }] });
  }

  const payload = {
    user: {
      id: user.id,
    },
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: "5 days" },
    (err, token) => {
      if (err) throw err;
      res.json({ token });
    }
  );
  // } catch (err) {
  //   console.error(err.message);
  //   res.status(500).send("Server error");
  // }
};

module.exports = login;
