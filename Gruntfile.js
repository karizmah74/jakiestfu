module.exports = function (grunt) {

  var pkg = grunt.file.readJSON('package.json');
  var banner = "/*! jakie shut the fuck up dot com */";

  grunt.initConfig({

    pkg: pkg,

    clean: {
      pre: {
        src: ["dist"]
      }
    },

    concat: {
      lib: {
        src: [
          'bower_components/svg-injector/dist/svg-injector.min.js'
        ],
        dest: 'dist/js/lib.js'
      },
      core: {
        options: {
          footer: "stfu.version = '<%= pkg.version %>';"
        },
        src: [
          'src/js/**/*.js'
        ],
        dest: 'dist/js/stfu.js'
      }
    },

    copy: {
      html: {
        files: [
          {src: ['src/index.html'], dest: 'dist/index.html'},
          {expand: true,  cwd: 'src/svg/', src: ['**/*'], dest: 'dist/svg/'}
        ]
      }
    },

    jshint: {
      all: ['Gruntfile.js', 'src/js/**/*.js']
    },

    less: {
      core: {
        options: {
          banner: banner + "\n",
          compress: true,
          sourcemap: 'none'
        },
        files: {
          'dist/css/stfu.css': 'src/less/core.less'
        }
      }
    },

    uglify: {
      lib: {
        options: {
          preserveComments: 'none'
        },
        files: {
          'dist/js/lib.js': 'dist/js/lib.js'
        }
      },
      core: {
        options: {
          banner: banner + "\n",
          preserveComments: 'none'
        },
        files: {
          'dist/js/stfu.js': 'dist/js/stfu.js'
        }
      }
    },

    watch: {
      js: {
        files: 'src/js/**/*.js',
        tasks: ['jshint', 'concat', 'uglify']
      },
      less: {
        files: 'src/less/**/*.less',
        tasks: ['less']
      },
      html: {
        files: 'src/**/*.html',
        tasks: ['copy']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register Tasks
  grunt.registerTask('default', ['clean', 'jshint', 'concat', 'uglify', 'copy', 'less']);
  grunt.registerTask('develop', ['clean', 'jshint', 'concat', 'uglify', 'copy', 'less', 'watch']);
};
