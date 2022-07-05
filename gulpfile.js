import gulp from "gulp";
import rename from "gulp-rename";
import uglify from "gulp-uglify";
import rs from "readable-stream";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import cleanCSS from "gulp-clean-css";
import del from "del";

const { src, dest, series } = gulp;
const { pipeline } = rs;
const sass = gulpSass(dartSass);

const clean = () => {
  return del("dist/**", { force: true });
};

const copy = () => {
  return src("src/**").pipe(dest("dist"));
};

const compressScript = () => {
  return src("src/**/*.js")
    .pipe(rename({ suffix: ".min" }))
    .pipe(uglify())
    .pipe(dest("dist"));
};

const buildStyles = () => {
  return gulp
    .src("src/**/*.scss")
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(gulp.dest("dist"));
};

const minifyCSS = () => {
  return gulp
    .src("dist/**/*.css")
    .pipe(rename({ suffix: ".min" }))
    .pipe(cleanCSS())
    .pipe(gulp.dest("dist"));
};

const build = series(clean, copy, compressScript, buildStyles, minifyCSS);

export { build };
export default build;
