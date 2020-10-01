/*global module:false*/
var child_process = require('child_process');

module.exports = function(grunt) {

  // Project configuration goes here.
  grunt.initConfig({
    watch: {
      files: [ 'www/templates/*.tmpl' ],
      tasks: 'fixtures mocha'
    },
    jshint: {
      all: ['lib/**/*.js', 'test/tests/**/*.js', 'www/js/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
          globals: {
          define: true,
          require: true,
          sinon: true
        }
      }
    },
    uglify: {},
    mocha: {
      index: [ 'test/runner/index.html' ]
    }
  });

  grunt.registerTask('fixtures', 'Build template fixture', function() {
    var obj = {};

    var addFile = function(filepath, contents) {
      obj[ filepath.replace('templates/', '') ] = contents;
    };

    var options = {cwd: 'www'};

    grunt.file.expand(options, 'templates/*.tmpl').forEach(function(filepath) {
      addFile(filepath, grunt.file.read('www/' + filepath));
    });

    var src = 'define(function() { return ' + JSON.stringify(obj, null, 2) + '; });';

    grunt.file.write('test/fixtures/templates.js', src);
  });

  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint', 'mocha']);
  grunt.registerTask('test', ['fixtures', 'mocha', 'jshint']);
};

