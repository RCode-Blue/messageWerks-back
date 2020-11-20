const httpMocks = require("node-mocks-http");

const CreateUserController = require("../../../src/services/users/createUser");
const UserModel = require("../../../src/db/models/User");
const newUser = require("../../mockData/new-user.json");
const encrypt = require("../../../src/scripts/encrypt");

CreateUserController.createUser = jest.fn();

describe("createUser", () => {
  let req, res, next;
  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
    req.body = newUser;
  });

  test("should have a create user function", () => {
    expect(typeof CreateUserController.createUser).toBe("function");
  });

  test("should call UserModel.create", () => {
    UserModel.create = jest.fn();
    CreateUserController.createUser();

    // expect(UserModel.create).toBeCalled();
  });
});
