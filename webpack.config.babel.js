const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const path = require('path');
const root = path.resolve(`${__dirname}`);
const isDev = process.env.NODE_ENV !== 'production';

console.info(`Webpack running in ${process.env.NODE_ENV}`);

module.exports = {
  entry: {
    hangaralpha: './src/js/hangar.js'
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(root, 'dist', 'js')
  },
  externals: {
    jquery: 'jQuery',
    underscore: '_',
    backbone: 'Backbone'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['env']
        }
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(
      ['dist/js']
    ),

    isDev
      ? () => { }
      : new UglifyJSPlugin({
        uglifyOptions: {
          ie8: false,
          mangle: true,
          output: {
            comments: false,
            beautify: false
          },
          warnings: false
        }
      })
  ],
  devtool: isDev ? 'cheap-eval-source-map' : false,
  stats: isDev
}
