'use strict';

let path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve('./js/qg-main/_entry.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve('./_build/js'),
  },

  devtool: '#cheap-source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};
