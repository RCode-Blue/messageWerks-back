const { expect } = require("chai");
const server = require("../src/server");

describe("test if environment is loaded", () => {
  it("loads environment variable", function () {
    expect(process.env.NODE_ENV).to.be.oneOf(["production", "development"]);
  });
});
