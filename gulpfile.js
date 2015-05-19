'use strict';

var pkg = require('./package.json'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  connect = require('gulp-connect'),
  uglify = require('gulp-uglify'),
  del = require('del'),
  opn = require('opn'),
  ghpages = require('gh-pages'),
  path = require('path'),
  wiredep = require('wiredep').stream,
  usemin = require('gulp-usemin'),
  rev = require('gulp-rev'),
  minifyCss = require('gulp-minify-css'),
  autoprefixer = require('gulp-autoprefixer');

gulp.task('images', ['clean:images'], function() {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('wiredep', function () {
  gulp.src('src/index.html')
    .pipe(wiredep())
    .pipe(gulp.dest('src'))
    .pipe(connect.reload());
});

gulp.task('usemin', ['clean:html', 'clean:js', 'clean:css'], function () {
  return gulp.src('src/index.html')
      .pipe(usemin({
        css: [
          autoprefixer('last 2 versions', { map: false }),
          minifyCss(),
          'concat'
        ], //, rev()
        js: [uglify()]
      }))
      .pipe(gulp.dest('dist'));
});

gulp.task('clean', function(done) {
  del('dist', done);
});

gulp.task('clean:html', function(done) {
  del('dist/index.html', done);
});

gulp.task('clean:js', function(done) {
  del('dist/scripts', done);
});

gulp.task('clean:css', function(done) {
  del('dist/styles', done);
});

gulp.task('clean:images', function(done) {
  del('dist/images', done);
});

gulp.task('connect', function() {
  connect.server({
    root: 'src',
    livereload: true,
    middleware: function (connect) {
      return [
        connect().use(
          '/bower_components',
          connect.static('./bower_components')
        )
      ];
    }
  });
});

gulp.task('open', ['connect'], function (done) {
  opn('http://localhost:8080', done);
});

gulp.task('watch', function() {
  gulp.watch([
      'src/**/*.html',
      'src/styles/**/*.css',
      'src/images/**/*',
      'src/scripts/**/*.js'
    ])
    .on('change', function(file) {
      gulp.src(file.path).pipe(connect.reload());
    });
  gulp.watch('bower.json', ['wiredep']);
});


gulp.task('deploy', ['build'], function(done) {
  ghpages.publish(path.join(__dirname, 'dist'), { logger: gutil.log }, done);
});

gulp.task('build', ['wiredep', 'usemin', 'images']);

gulp.task('serve', ['wiredep', 'open', 'watch']);

gulp.task('default', ['build']);
