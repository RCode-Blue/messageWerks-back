const assert = require("assert");
const should = require("chai").should();

describe("Basic mocha test", function () {
  it("should deal with objects", function () {
    var obj = { name: "Jon", gender: "male" };
    var objB = { name: "Jon", gender: "male" };

    obj.should.deep.equal(objB);
  });
});
