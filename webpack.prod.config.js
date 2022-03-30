const commonConfig = require("./webpack.base.config");

console.log("Building production config...");

var prodConfig = {};

var config = Object.assign(prodConfig, commonConfig);

module.exports = config;
