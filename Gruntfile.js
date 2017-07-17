module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  var config = {}

  /* End initConfig */
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
        src: ['.tmp/_scss/**/*.css'], 
        dest: 'dist/css/hangaralpha.css'
      },
      distJs: {
        src: ['_js/*.js', '_js/components/*.js'], 
        dest: 'dist/js/hangaralpha.js'
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
          dest: '_scss/vendor/perfect-scrollbar/'
        }]
      }

    },

    sass: {
      dist: {
        options: {
          sourceMap: false,
          outputStyle: 'compressed'
        },
        files: [{
          expand: true,
          src: ['_scss/main.scss'],
          dest: '.tmp',
          ext: '.css'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '_img',
          src: '**/*.svg',
          dest: 'dist/img'
        }]
      }
    },



    watch: {
      scss: {
        files: [
          '_scss/**/*.scss'
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
        files: ['_js/**/*.js'],
        tasks: ['concat']
      },
    }





  });
  /* End initConfig */

  var baseTasks = [
    'clean',
    'copy',
    'sass',
    'concat',
    'svgmin'
  ];

  var devTasks = baseTasks.concat([
    'connect',
    'watch'
  ]);

  grunt.registerTask('dev', devTasks);
  grunt.registerTask('build', baseTasks);
  grunt.registerTask('default', baseTasks);

}