/* jshint node: true */

'use strict';

var through = require('through2');
var path = require('path');
var gutil = require('gulp-util');
var Dalek = require('dalekjs');
var path = require('path');

module.exports = function (opt) {
  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-dalek', 'Streaming not supported'));
      return cb();
    }

    try {
      var testPath = path.relative(file.cwd, file.path);

      var dalek = new Dalek({
        tests: [testPath],
      });

      dalek.run();
    } catch (err) {
      console.log(err)
      this.emit('error', new gutil.PluginError('gulp-<%= pluginName %>', err));
    }

    // this.push(file);
    // cb();
  });
};
