const webpackConfig = require('./webpack.config.babel');

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  var config = {}

  /* Start initConfig */
  grunt.initConfig({

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.sass-cache',
            '.tmp',
            'dist',
            '!dist/.git*'
          ]
        }]
      }
    },

    concat: {
      distCss: {
        src: ['.tmp/css/*.css'],
        dest: 'dist/css/hangaralpha.min.css'
      }
    },

    connect: {
      server: {
        options: {
          port: 9003,
          livereload: 35732,
          open: true,
          hostname: '0.0.0.0',
          base: {
            path: '.'
          }
        }
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: 'node_modules/perfect-scrollbar/src/css/',
          src: '*.scss',
          dest: 'src/scss/vendor/perfect-scrollbar/'
        }, {
          expand: true,
          cwd: 'src/templates',
          src: '*.html',
          dest: 'dist/templates/'
        }, {
          expand: true,
          cwd: 'src/scss',
          src: '**/*.scss',
          dest: 'dist/scss/'
        }, {
          expand: true,
          cwd: 'src/data',
          src: '**/*.yml',
          dest: 'dist/data/'
        }, {
          expand: true,
          cwd: 'styleguide',
          src: '**/*.css',
          dest: 'dist/styleguide/'
        }]
      }

    },

    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: ['**/*']
    },


    sass: {
      dist: {
        options: {
          sourceMap: false,
          outputStyle: 'compressed'
        },
        files: [{
          expand: true,
          cwd: 'src/scss',
          src: 'main.scss',
          dest: '.tmp/css/',
          ext: '.css'
        }]
      }
    },

    shell: {
      style: {
        command: 'npm run styleguide'
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/img',
          src: '**/*.svg',
          dest: 'dist/img'
        }]
      }
    },

    webpack: {
      options: {
        stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      },
      prod: webpackConfig
    },

    watch: {
      scss: {
        files: [
          'src/scss/**/*.scss'
        ],
        tasks: [
          'sass',
          'concat'
        ],
        options: {
          spawn: false,
          livereload: 35732
        }
      },
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['webpack:prod']
      }
    }
  });
  /* End initConfig */

  var baseTasks = [
    'clean',
    'copy',
    'sass',
    'concat',
    'webpack:prod',
    'svgmin',
    'shell'
  ];

  var devTasks = baseTasks.concat([
    'connect',
    'watch'
  ]);

  grunt.event.on('watch', function (action, filepath) {
    grunt.task.run('shell:style');
  });

  grunt.registerTask('dev', devTasks);
  grunt.registerTask('build', baseTasks);
  grunt.registerTask('default', baseTasks);
  grunt.registerTask('publish', ['build', 'gh-pages']);

}
