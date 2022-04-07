const dbConnect = require("../../config/elephantSql/elephantConnect");
const User = require("../../models/User");
const pgResponse = require("../../services/postgresResponse");

const db = dbConnect();

// const User = db.users;
// console.log("db: ", db());
// const Op = db.Sequelize.Op;

/*
const getAllUsers= (req, res) => {
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
*/

const getAllUsers = async () => {
  let response;
  try {
    let result = await User.findAll({
      attributes: [
        "role",
        "email",
        "firstName",
        "lastName",
        "slug",
        "password",
      ],
    });
    response = pgResponse(200, "", result);
  } catch (err) {
    response = pgResponse(400, "", "", { error: err });
  }
  return response;
};

module.exports = getAllUsers;
