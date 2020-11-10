const path = require("path");
const nodeExternals = require("webpack-node-externals");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const envPath = path.join(__dirname) + "/.env." + process.env.NODE_ENV;
const envPathDefault = path.join(__dirname) + "/.env";
const envPathFinal = fs.existsSync(envPath) ? envPath : envPathDefault;

const env = dotenv.config({ path: envPathFinal }).parsed;

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
      filename: "index.html",
      excludeChunks: ["server"],
    }),
    new webpack.DefinePlugin({
      "process.MONGO_DB_NAME": JSON.stringify(process.env.MONGO_DB_NAME),
      "process.MONGO_READER_ACCOUNT": JSON.stringify(
        process.env.MONGO_READER_ACCOUNT
      ),
      "process.env.MONGO_READER_PASSWORD": JSON.stringify(
        env.MONGO_READER_PASSWORD
      ),
      "process.env.MONGO_USER_ACCOUNT": JSON.stringify(env.MONGO_USER_ACCOUNT),
      "process.env.MONGO_USER_PASSWORD": JSON.stringify(
        env.MONGO_USER_PASSWORD
      ),
      // "process.env.": JSON.stringify(env.),
    }),
  ],
};

module.exports = config;
