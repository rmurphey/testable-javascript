/*global module:false*/
var child_process = require('child_process');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      files: ['lib/**/*.js', 'test/tests/**/*.js', 'www/js/**/*.js']
    },
    watch: {
      files: [ '<config:lint.files>', 'www/templates/*.tmpl' ],
      tasks: 'fixtures mocha'
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
        require: true,
        sinon: true
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

  grunt.registerTask('default', 'lint mocha');
  grunt.registerTask('test', 'fixtures mocha lint');
};

