module.exports = function (req, res, next) {
  console.log(req.headers);
  console.log("---");
  console.log(req.method);
  console.log("---");
  console.log(req.body);
  console.log("---");
  console.log(req.header("content-type"));
  res.status(200);
  return res.json({ msg: "printRoute" });
};
