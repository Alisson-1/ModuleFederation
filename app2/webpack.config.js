const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = (_, args) => ({
  entry: './src/index',
  mode: args.mode ?? "development",
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3002,
    allowedHosts: 'all',
  },
  output: {
    publicPath: args.mode == "production" ? "https://modulefederation.onrender.com/" :  "http://localhost:3002/",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    // To learn more about the usage of this plugin, please visit https://webpack.js.org/plugins/module-federation-plugin/
    new ModuleFederationPlugin({
      name: 'app2',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App',
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
});
