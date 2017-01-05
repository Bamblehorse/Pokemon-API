'use strict';

var gulp = require('gulp'),
	  sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref'),
	  browserSync = require('browser-sync').create();

gulp.task('default',['browserSync', 'watch'], function() {
});

gulp.task('unPugify', function buildHTML() {
  return gulp.src('src/pug/*.pug')
  .pipe(pug({pretty: true}))
  .pipe(gulp.dest('dist/'));
});

gulp.task('useref', function(){
  return gulp.src('dist/*.html')
    .pipe(useref())
    .pipe(gulp.dest('dist/'));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  });
});

gulp.task('refresh', function() {
	return gulp
    .src('dist')
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function() {
  return gulp.src('src/sass/**/*.+(scss|sass)')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('uglify', function() {
 return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function () {
  gulp.watch('src/sass/**/*.+(scss|sass)', ['sass', 'refresh']); // useref
  gulp.watch('dist/**/*.html', ['refresh']);
  gulp.watch('src/**/*.pug', ['unPugify']);
  gulp.watch('src/js/*.js', ['uglify', 'refresh']);
});