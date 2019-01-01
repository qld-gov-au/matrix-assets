const gulp = require("gulp");
const sass = require("gulp-sass");
const connect = require('gulp-connect');
const webpack = require("webpack");
const gulpWebpack = require("webpack-stream");
const include   = require("gulp-include");
const nightwatch = require('gulp-nightwatch');

gulp.task('connect', function() {
    connect.server({
        root: './_build',
        port: 8006,
        livereload: true
    });
});

gulp.task("sass", function() {
  gulp
    .src("./css/qg-main.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./_build/css"))
      .pipe(connect.reload());

});



gulp.task("js", function() {
  return gulp
    .src("./js/qg-main/qg-main.js")
    .pipe(gulpWebpack(require("./webpack.config.js"), webpack))
    .pipe(gulp.dest("./_build/js/"))
      .pipe(connect.reload());

});

gulp.task("serve", ["js", "sass"], function() {
    connect.server({
        root: './_build',
        livereload: true,
        port: 8084
    });

  gulp.watch("./css/qg-main/**/*.scss", ["sass"]);
  gulp.watch("./js/qg-main/*.js", ["js"]);
  gulp.watch("./js/qg-main/lib/**/*.*", ["js"]);
});


