const assert = require("assert");
const should = require("chai").should();
const { expect } = require("chai");

describe("Basic mocha test", function () {
  console.log();
  console.log();
  console.log("-----------------------------------");
  it("should deal with objects", function () {
    var obj = { name: "Jon", gender: "male" };
    var objB = { name: "Jon", gender: "male" };

    obj.should.deep.equal(objB);
  });
});
