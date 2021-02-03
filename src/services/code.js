const uuid = require("uuid");
const bcrypt = require("bcrypt");

const encrypt = require("./password/encrypt");

const setCode = async () => {
  console.log("--- CODE ---");
  const { v4 } = uuid;

  const code = v4();
  // console.log(code);
  const hash = await encrypt(code);

  // console.log("code: ", code);
  // console.log("hash: ", hash);

  // return "liudsrfgbpiosrdu";

  return { code, hash };
  // hash is saved to db
};

const verifyCode = async (code, savedCode) => {
  const isMatch = await bcrypt.compare(code, savedCode);
  return isMatch;
};
module.exports = { setCode, verifyCode };
