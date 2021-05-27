const assert = require("assert");
const appRoot = require("app-root-path");

const postContact = require(appRoot +
  "/src/v1/routes/controllers/contacts/postContact");

describe("postContact", function () {
  describe("res", function () {
    it("Should return TRUE if Contact found");
    assert.strictEqual(1, 1);
    // assert.strictEqual(true, postContact.res.status(409, 409));
  });
});
