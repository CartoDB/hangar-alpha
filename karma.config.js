const webpack = require('webpack');
const webpackConfig = require('./webpack.config.babel.js');
Object.assign(webpackConfig, {
  entry: () => {
    return {};
  }
});

module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    reporters: ['spec'],
    autoWatch: true,
    browsers: ['Chrome'],
    files: [
      './node_modules/jquery/dist/jquery.js',
      './node_modules/underscore/underscore.js',
      './node_modules/backbone/backbone.js',
      './node_modules/jasmine-jquery/lib/jasmine-jquery.js',
      './tests/*.js'
    ],
    preprocessors: {
      './tests/*.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,
    webpackMiddleWare: {
      noInfo: true
    }
  });
};
