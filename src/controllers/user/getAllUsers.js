const db = require("../../models/index");

const User = db.users;
console.log("db: ", db());
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  User.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occured",
      });
    });
};
