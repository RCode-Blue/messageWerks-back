var { expect } = require("chai");
var should = require("chai").should();
var sinon = require("sinon");

const postUser = require("../../../../../src/routes/controllers/users/postUser");
const route = require("../../../../../src/routes/api/users");
const testUser = require("../../../../mockData/test-user.json");

describe("createUser", () => {
  it("errors out if a user already exist", () => {
    const userExists = {
      user: testUser,
      findUser: async function (email) {
        await User.findOne(email);
      },
    };
    const checkUser = sinon.stub(userExists, "findUser").returns(testUser);
    const req = testUser;
    const res = {
      send: sinon.spy(),
      json: sinon.spy(),
    };
    postUser(req, res);
    console.log("---");
    console.log(res);
    // checkUser.calledOnce.should.be.true;
    // res.json.calledOnce.should.be.true;
  });

  it("returns token if user submitted");
});
