'use strict';

var gulp = require('gulp');
var path = require('path');
var plugins = require('gulp-load-plugins')();

gulp.task('scss', function () {
	return gulp.src(path.resolve('./css', 'qg-main', '**/*.scss'))
	.pipe(plugins.sourcemaps.init())
	.pipe(plugins.sass())
	.pipe(plugins.concat('qg-main.css'))
	.pipe(plugins.sourcemaps.write('.'))
	.pipe(gulp.dest(path.resolve('./dist')))
});