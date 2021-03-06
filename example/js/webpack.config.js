const path = require('path');
const webpack = require('webpack');

const DEVELOPMENT = process.argv.indexOf('--watch') > 0;
const UGLIFY = process.env.UGLIFY === 'true' || !DEVELOPMENT;
const rel = x => path.resolve(__dirname, x);


const config = {
  entry: {
    'dist/all': rel('./index.js'),
  },
  output: {
    path: rel('..'),
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: [
          /node_modules\//,
        ],
      },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.less$/, loader: 'style!css!less' },
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url?limit=100000' },
    ],
  },
  plugins: [],
};


if (DEVELOPMENT) {
  config.devtool = 'eval';
}

if (UGLIFY) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    mangle: true,
    compress: {
      drop_console: false,
    },
  }));
  config.devtool = undefined;
}

module.exports = config;
