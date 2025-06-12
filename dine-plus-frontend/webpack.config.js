const path = require('path');

module.exports = {
  // ...existing code...
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader',
        exclude: /node_modules/,
      },
    ],
  },
  ignoreWarnings: [/Failed to parse source map/],
};