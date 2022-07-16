const path = require("path");
const nodeExternals = require("webpack-node-externals");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var config = {
  entry: {
    server: "./src/server.js",
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js",
  },
  target: "node",
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      excludeChunks: ["server"],
    }),
  ],
};

module.exports = config;
