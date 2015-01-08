# [gulp](http://gulpjs.com)-[dalek](http://dalekjs.com/)

*Issues with the output should be reported on the Dalek [issue tracker](https://github.com/dalekjs/dalek/issues).*


## Install

```bash
$ npm install --save-dev gulp-dalek
```


## Usage

```js
var gulp = require('gulp');
var dalek = require('gulp-dalek');

gulp.task('test', function() {
  return gulp.src(['test/functional/base.js'])
    .pipe(dalek({
      browser: ['phantomjs', 'chrome', 'chrome:canary'],
      reporter: ['html', 'junit']
    }));
});

```

## API

### dalek(options)

Advanced options must be specified in your `Dalekfile`.

#### options

Options are applied to the correct files.

##### browser

Type: `array`
Default: `null`

The browsers you would like to test.

*With the exception of PhantomJS, you need to have the corresponding Dalek [browser plugins](https://github.com/dalekjs?query=dalek-browser) installed.*

##### reporter

Type: `array`
Default: `null`

The reporters you would like to invoke

*With the exception of console output, you need to have the corresponding Dalek [reporter plugins](https://github.com/dalekjs?query=dalek-reporter) installed.*

## License
&copy; 2014 GoInstant Inc., a salesforce.com company. Licensed under the BSD 3-clause license.

[![GoInstant](http://goinstant.com/static/img/logo.png)](http://goinstant.com)
