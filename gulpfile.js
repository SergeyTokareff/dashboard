const { src, dest, task, series, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();

task("copy-html", function () {
  return src("src/index.html")
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
});

task("copy-img", () => {
  return src("./src/img/**/*").pipe(dest("./dist/img"));
});

task("sass", function () {
  return src("src/scss/styles.scss")
    .pipe(sass())
    .pipe(dest("./dist/css"))
    .pipe(browserSync.stream());
});

task("watch", function () {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });

  watch("./src/scss/**/*.scss", series("sass"));
  watch("./src/index.html", series("copy-html"));
  watch("./src/img/**/*", series("copy-img"));
  watch("dist/index.html").on("change", browserSync.reload);
});

task("default", series("sass", "copy-html", "copy-img", "watch"));
