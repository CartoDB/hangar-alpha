const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const path = require('path');
const root = path.resolve(`${__dirname}`);
const isDev = process.env.NODE_ENV !== 'production';

console.info(`Webpack running in ${process.env.NODE_ENV}`);

const config = {
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
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      }
    ]
  },

  plugins: [
    isDev
      ? () => {}
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
};

var hangarConfig = Object.assign({}, config, {
  entry: './src/js/hangar.js',
  output: {
    path: path.resolve(root, 'dist', 'js'),
    filename: 'hangaralpha.min.js'
  }
});

var landingConfig = Object.assign({}, config, {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(root, 'dist', 'framework', 'js'),
    filename: 'main.js'
  }
});

var partialConfig = Object.assign({}, config, {
  entry: './src/js/partials.js',
  output: {
    path: path.resolve(root, 'dist', 'partials', 'js'),
    filename: 'main.js'
  }
});

module.exports = [hangarConfig, landingConfig, partialConfig];
