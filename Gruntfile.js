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
        dest: 'dist/css/hangaralpha.css'
      },
      distJs: {
        src: ['src/js/*.js', 'src/js/components/*.js'],
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
          dest: 'src/scss/vendor/perfect-scrollbar/'
        },{
          expand: true,
          cwd: 'src/templates',
          src: '*.html',
          dest: 'dist/templates/'
        },{
          expand: true,
          cwd: 'src/scss',
          src: '**/*.scss',
          dest: 'dist/scss/'
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
        command: 'styleguide'
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