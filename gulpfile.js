// assign simple names to each package used in gulp file
var gulp = require("gulp"),
  stylus = require("gulp-stylus"),
  uglify = require("gulp-uglify"),
  plumber = require("gulp-plumber"),
  prefix = require("gulp-autoprefixer"),
  htmlmin = require("gulp-html-minifier");

gulp.task("minifyHTML", function() {
  gulp
    .src("./index.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./dist"));
});

gulp.task("styles", function() {
  console.log("converting .styl files to .css");
  gulp
    .src("css/**/*.styl")
    .pipe(plumber())
    .pipe(
      stylus({
        compress: true
      })
    )
    .pipe(prefix("last 2 versions"))
    .pipe(gulp.dest("./dist/css"));
});

gulp.task("uglifyjs", function() {
  console.log("uglyfying js files");
  gulp
    .src("js/**/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("./dist/js"));
});

gulp.task("watch", function() {
  console.log("watching for changes");
  gulp.watch("js/**/*.js", ["uglifyjs"]);
  gulp.watch("css/**/*.styl", ["styles"]);
  gulp.watch("index.html", ["minifyHTML"]);
});

//run by typing "gulp" from command line
gulp.task("default", ["uglifyjs", "minifyHTML", "styles", "watch"]);
