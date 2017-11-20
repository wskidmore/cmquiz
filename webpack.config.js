var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var loaders = [
  {
    "test": /\.jsx?$/,
    "exclude": /node_modules/,
    "loader": "babel-loader",
    "query": {
      "presets": [
        "babel-preset-latest",
        "babel-preset-react"
      ],
      "plugins": ["transform-class-properties"]
    }
  },
  { test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/, loader: 'file-loader' }
];

module.exports = {
  devtool: 'eval-source-map',
  entry: path.resolve('root.js'),
  output: {
    path: path.resolve('build'),
    filename: 'root.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('index.tpl.html'),
      filename: 'index.html',
      inject: false
    })
  ],
  module: {
    loaders: loaders
  }
};
