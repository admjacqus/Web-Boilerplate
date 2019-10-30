"use strict";

// Load plugins
var gulp = require("gulp"),
  sass = require("gulp-sass"),
  babel = require("gulp-babel"),
  uglify = require("gulp-uglify"),
  postcss = require("gulp-postcss"),
  sourcemaps = require("gulp-sourcemaps"),
  autoprefixer = require("autoprefixer"),
  htmlmin = require("gulp-htmlmin"),
  browserSync = require("browser-sync").create(),
  cssnano = require("cssnano");

const paths = {
  styles: {
    // By using styles/**/*.sass we're telling gulp to check all folders for any sass file
    src: "src/sass/main.scss",
    // Compiled files will end up in whichever folder it's found in (partials are not compiled)
    dest: "app/css"
  },
  scripts: {
    src: "src/js/main.js",
    dest: "app/js"
  },
  html: {
    src: "src/*.html",
    dest: "app/"
  }
};

function style() {
  return (
    gulp
      .src(paths.styles.src)
      // Initialize sourcemaps before compilation starts
      .pipe(sourcemaps.init())
      .pipe(sass())
      .on("error", sass.logError)
      // Use postcss with autoprefixer and compress the compiled file using cssnano
      .pipe(postcss([autoprefixer(), cssnano()]))
      // Now add/write the sourcemaps
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.styles.dest, { overwrite: true }))
  );
}

// A simple task to reload the page
function reload(done) {
  browserSync.reload();
  done();
}

// Add browsersync initialization at the start of the watch task
function server() {
  browserSync.init({
    server: {
      baseDir: "app",
      index: "./index.html"
    },
    port: 1425
  });
}

gulp.watch(paths.scripts.src, gulp.series(script, reload));
gulp.watch(paths.styles.src, gulp.series(style, reload));
gulp.watch(paths.html.src, gulp.series(html, reload));

function script() {
  return gulp
    .src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/preset-env"]
      })
    )
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.scripts.dest));
}

function html() {
  return gulp
    .src(paths.html.src)
    .pipe(sourcemaps.init())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.html.dest));
}

// Don't forget to expose the task!
exports.reload = reload;
exports.html = html;
exports.style = style;
exports.script = script;

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
var build = gulp.series(html, style, script, server);

/*
 * Define default task that can be called by just running `gulp` from cli
 */
gulp.task("default", build);
