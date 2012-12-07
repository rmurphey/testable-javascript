/*global module:false*/
var child_process = require('child_process');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      files: ['lib/**/*.js', 'test/tests/**/*.js', 'www/js/**/*.js']
    },
    qunit: {
      files: ['test/**/test-*.html']
    },
    watch: {
      files: [ '<config:lint.files>', 'www/templates/*.tmpl' ],
      tasks: 'test'
    },
    jshint: {
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
        browser: true
      },
      globals: {
        define: true,
        require: true
      }
    },
    uglify: {},
    mocha: {
      index: [ 'test/runner/index.html' ]
    }
  });

  grunt.registerTask('mocks', 'Build template mocks', function() {
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

  grunt.registerTask('default', 'lint mocha');
  grunt.registerTask('test', 'mocks mocha lint');
};

