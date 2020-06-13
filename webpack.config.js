// ./webpack.config.js

const path = require("path");

module.exports = {
  entry: "./server.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname + "/dist")
  },
  mode: "none",
  node: {
    fs: "empty",
    net : "empty",
    tls : "empty"
 }
 
};