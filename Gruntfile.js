module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  // we need to set the NODE_ENV before require webpack config
  (() => {
    const prodTasks = ['build', 'publish'];
    const task = grunt.cli.tasks[0];
    const prodEnv = prodTasks.indexOf(task) > -1;
    process.env.NODE_ENV = prodEnv ? 'production' : 'development';
  })();

  const webpackConfig = require('./webpack.config.babel');

  /* Start initConfig */
  grunt.initConfig({
    clean: {
      dist: {
        files: [
          {
            dot: true,
            src: ['.sass-cache', '.tmp', 'dist', '!dist/.git*']
          }
        ]
      }
    },

    concat: {
      distCss: {
        src: ['.tmp/css/*.css'],
        dest: 'dist/css/hangaralpha.min.css'
      }
    },

    copy: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'node_modules/perfect-scrollbar/src/css/',
            src: '*.scss',
            dest: 'src/scss/vendor/perfect-scrollbar/'
          },
          {
            expand: true,
            cwd: 'src/img',
            src: '*.jpg',
            dest: 'dist/img/'
          },
          {
            expand: true,
            cwd: 'src/partials',
            src: '*.html',
            dest: 'dist/partials/'
          }
        ]
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
        files: [
          {
            expand: true,
            cwd: 'src/scss',
            src: 'main.scss',
            dest: '.tmp/css/',
            ext: '.css'
          }
        ]
      }
    },

    shell: {
      style: {
        command: 'npm run styleguide'
      }
    },

    svgmin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'src/img',
            src: '**/*.svg',
            dest: 'dist/img'
          }
        ]
      }
    },

    webpack: {
      all: webpackConfig
    },

    watch: {
      scss: {
        files: ['src/scss/**/*.scss'],
        tasks: ['sass', 'concat'],
        options: {
          spawn: false,
          livereload: 35732
        }
      },
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['webpack']
      },
      html: {
        files: ['styleguide/*.html', 'partials/*.html'],
        tasks: ['shell']
      }
    },

    eslint: {
      options: {
        configFile: '.eslintrc'
      },
      target: ['src/**/*.js']
    },

    karma: {
      unit: {
        configFile: 'karma.config.js'
      }
    },

    browserSync: {
      dev: {
        bsFiles: {
          src: ['dist/**/*']
        },
        options: {
          watchTask: true,
          server: './dist',
          startPath: '/framework'
        }
      }
    }
  });
  /* End initConfig */

  var baseTasks = [
    'clean',
    'copy',
    'sass',
    'concat',
    'webpack',
    'svgmin',
    'shell'
  ];

  var devTasks = baseTasks.concat(['browserSync', 'watch']);

  grunt.event.on('watch', function (action, filepath) {
    grunt.task.run('shell:style');
  });

  grunt.registerTask('dev', devTasks);
  grunt.registerTask('build', baseTasks);
  grunt.registerTask('default', baseTasks);
  grunt.registerTask('publish', ['eslint', 'build', 'gh-pages']);
  grunt.registerTask('test', ['karma']);
  grunt.registerTask('lint', ['eslint']);
};
