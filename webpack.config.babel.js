const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const path = require('path');
const root = path.resolve(`${__dirname}`);

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

    // new UglifyJSPlugin({
    //   uglifyOptions: {
    //     ie8: false,
    //     mangle: true,
    //     output: {
    //       comments: false,
    //       beautify: false
    //     },
    //     warnings: false
    //   }
    // })
  ]
}
