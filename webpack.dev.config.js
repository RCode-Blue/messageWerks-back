const commonConfig = require("./webpack.base.config");

console.log("Building dev config...");

var devConfig = {};

var config = Object.assign(devConfig, commonConfig);

module.exports = config;
