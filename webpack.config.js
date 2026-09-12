const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  devtool: "source-map",
  context: path.join(__dirname, "src"),
  entry: "./index.js",
  devServer: {
    static: { directory: path.resolve(__dirname, "build") },
    host: "localhost",
    open: false,
    watchFiles: "src/index.html",
  },
  module: {
    rules: [
      { test: /\.js$/i, loader: "babel-loader" },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { url: false } },
          "postcss-loader",
          "sass-loader",
        ],
      },
      { test: /\.html$/i, loader: "html-loader", options: { sources: false } },
    ],
  },
  plugins: [
    new CopyPlugin({ patterns: [{ from: "./assets/", to: "./assets/" }] }),
    new MiniCssExtractPlugin({ filename: "css/main.css" }),
    new HtmlWebpackPlugin({ template: "index.html", inject: "body" }),
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    clean: true,
  },
};
