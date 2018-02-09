const webpackConfig = {
  entry: () => {
    return {};
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
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      }
    ]
  },
  devtool: false,
  stats: false
};

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
