/*global module:false*/
var child_process = require('child_process');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      files: ['lib/**/*.js', 'test/**/*.js', '! test/lib/**/*.js', 'www/js/**/*.js']
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
        $ : true,
        _ : true,
        RSVP : true,
        app : true
      }
    },
    uglify: {}
  });

  grunt.registerTask('build-template-mocks', 'Build template mocks', function() {
    var obj = {};

    var addFile = function(filepath, contents) {
      obj[ filepath.replace('templates/', '') ] = contents;
    };

    var options = {cwd: 'www'};

    grunt.file.expand(options, 'templates/*.tmpl').forEach(function(filepath) {
      addFile(filepath, grunt.file.read('www/' + filepath));
    });

    var src = 'window._templateMocks = ' + JSON.stringify(obj, null, 2) + ';';

    grunt.file.write('test/fixtures/templates.js', src);
  });

  grunt.registerTask('spec', 'Run integration tests', function() {
    var done = this.async();
    var server = child_process.exec('node server');
    var spec = child_process.exec('ruby spec/*.rb', function(err) {
      server.kill();
      done( err ? false : true );
    });

    spec.stdout.on('data', function(data) {
      console.log(data);
    });
  });

  grunt.registerTask('default', 'lint qunit');
  grunt.registerTask('test', 'build-template-mocks qunit lint');
};

