module.exports = function (grunt) {

  var pkg = grunt.file.readJSON('package.json');
  var banner = "/*! jakie shut the fuck up dot com */";

  grunt.initConfig({

    pkg: pkg,

    autoprefixer: {
      core: {
        options: {
          browsers: ['last 3 versions', 'ie 8', 'ie 9']
        },
        src: 'dist/css/stfu.css',
        dest: 'dist/css/stfu.css'
      }
    },

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
        src: [
          'src/js/**/*.js'
        ],
        dest: 'dist/js/stfu.js'
      }
    },

    image: {
      static: {
        options: {
          pngquant: true,
          optipng: true,
        },
        files: {
          'dist/img/stfu.png': 'src/img/stfu.png',
        }
      },
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/index.html': 'src/index.html',
        }
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

    svgmin: {
      options: {
        plugins: [
          {
            removeViewBox: false
          }, {
            removeUselessStrokeAndFill: false
          }
        ]
      },
      dist: {
        files: {
          'dist/svg/stfu.svg': 'src/svg/stfu.svg',
          'dist/svg/stfu-black.svg': 'src/svg/stfu-black.svg'
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
      svg: {
        files: 'src/svg/**/*.svg',
        tasks: ['svgmin']
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

  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-image');

  // Register Tasks
  grunt.registerTask('default', ['clean', 'jshint', 'concat', 'uglify', 'htmlmin', 'svgmin', 'image', 'less', 'autoprefixer']);
  grunt.registerTask('develop', ['clean', 'jshint', 'concat', 'uglify', 'htmlmin', 'svgmin', 'image', 'less', 'autoprefixer', 'watch']);
};
