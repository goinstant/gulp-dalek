/* jshint node: true */

'use strict';

var Dalek = require('dalekjs');
var through = require('through2');
var path = require('path');
var gutil = require('gulp-util');
var _ = require('lodash');

module.exports = function(opts) {
  var defaults = { reporter: [], browser: [] };
  var options = opts || {};
  var files = [];
  var stream;

  var hasInvalidOption = _.any(opts, function (option) {
    return !_.isArray(option);
  });

  if (hasInvalidOption) {
    stream.emit('error', new gutil.PluginError({
      plugin: 'gulp-dalek',
      message: 'An invalid option has been provided'
     }));

    return;
  }

  options = _.defaults(options, defaults);

  function queueFile(file, enc, cb) {
    if (file.isNull()) {
      stream.push(file);

      return cb();
    }

    if (file.isStream()) {
      stream.emit('error', new gutil.PluginError({
        plugin: 'gulp-dalek',
        message: 'Streaming not supported'
      }));

      return cb();
    }

    stream.push(file);
    files.push(path.relative(file.cwd, file.path));
    cb();
  }

  function endStream() {
    options = _.merge(options, { tests: files });
    var dalek = new Dalek(options);
    dalek.run();
  }

  stream = through.obj(queueFile, endStream);

  return stream;
};
