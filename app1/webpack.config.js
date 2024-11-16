const HtmlWebpackPlugin = require("html-webpack-plugin");
const {ModuleFederationPlugin} = require("webpack").container;
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const path = require("path");

module.exports = (_, args) => ({
  entry: "./src/index",
  mode: args.mode ?? "development",
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3001,
    allowedHosts: 'all',
  },
  output: {
    publicPath: args.mode == "production" ? "https://modulefederation.onrender.com/" :  "http://localhost:3001/",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app1",
      remotes: {
        app2: "app2@[app2Url]/remoteEntry.js",
        app3: "app3@[app3Url]/remoteEntry.js",
      },
      shared: {react: {singleton: true}, "react-dom": {singleton: true}},
    }),
    new ExternalTemplateRemotesPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
});

