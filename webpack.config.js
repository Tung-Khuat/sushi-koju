const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
require('babel-polyfill');

module.exports = {
  mode: 'production',
  entry: {
    app: ['babel-polyfill', './src/index.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    hot: true,
    port: 3000,
  },
  plugins: [
    new HtmlWebPackPlugin({
      inject: false,
      template: './dist/index.html',
      filename: './index.html',
    }),
  ],
};
