module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var log = function(err, stdout, stderr, cb) {
    if (stdout) {
      grunt.log.writeln(stdout);
    }
    if (stderr) {
      grunt.log.error(stderr);
    }
    cb();
  };

  var config = {};

  /* Start initConfig */
  grunt.initConfig({
    clean: {
      dist: {
        files: [
          {
            dot: true,
            src: ['.sass-cache', '.tmp', 'dist', '_site', '!dist/.git*']
          }
        ]
      }
    },

    concat: {
      distCss: {
        src: ['.tmp/css/*.css'],
        dest: '_site/css/hangaralpha.css'
      },
      distJs: {
        src: ['src/js/*.js', 'src/js/components/*.js', 'src/js/vendor/*.js'],
        dest: 'dist/js/hangaralpha.js'
      }
    },

    copy: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'src/scss',
            src: '**/*.scss',
            dest: 'dist/scss/'
          }
        ]
      }
    },

    'gh-pages': {
      options: {
        base: '_src'
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
      jekyll: {
        command: 'bundle exec jekyll build',
        options: {
          callback: log
        }
      },

      jekyllDev: {
        command:
          'bundle exec jekyll build --draft --incremental JEKYLL_ENV=dev',
        options: {
          callback: log
        }
      }
    },

    // jekyll: {
    //   command: 'jekyll serve'
    // },

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

    watch: {
      scss: {
        files: ['src/scss/**/*.scss'],
        tasks: ['sass', 'concat'],
        options: {
          spawn: false
        }
      },
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['concat']
      },
      html: {
        files: ['_includes/**', '_layouts/**', '_data/**'],
        tasks: ['shell:jekyll', 'sass', 'concat']
      }
    },

    browserSync: {
      dev: {
        bsFiles: {
          src: ['_site/**/*.*']
        },
        options: {
          watchTask: true,
          server: './_site'
        }
      }
    }
  });
  /* End initConfig */

  var baseTasks = ['shell:jekyll', 'sass', 'concat', 'svgmin'];

  var devTasks = baseTasks.concat(['browserSync', 'watch']);

  grunt.event.on('watch', function(action, filepath) {
    grunt.task.run('shell:jekyllDev');
  });

  grunt.registerTask('dev', devTasks);
  grunt.registerTask('build', baseTasks);
  grunt.registerTask('default', baseTasks);
  grunt.registerTask('publish', ['build', 'gh-pages']);
};
