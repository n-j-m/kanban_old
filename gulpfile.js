"use strict";

var gulp = require("gulp"),
    changed = require("gulp-changed"),
    sass = require("gulp-ruby-sass"),
    csso = require("gulp-minify-css"),
    autoprefixer = require("gulp-autoprefixer"),
    browserify = require("browserify"),
    watchify = require("watchify"),
    source = require("vinyl-source-stream"),
    buffer = require("vinyl-buffer"),
    babelify = require("babelify"),
    uglify = require("gulp-uglify"),
    del = require("del"),
    notify = require("gulp-notify"),
    browserSync = require("browser-sync"),
    sourcemaps = require("gulp-sourcemaps"),
    runSeq = require("run-sequence"),
    merge = require("merge-stream"),
    nodemon = require("gulp-nodemon"),
    server = require("gulp-develop-server"),
    _merge = require("lodash/object/merge"),
    reload = browserSync.reload,
    browserifyOptions = {
      extensions: [".jsx"]
    },
    watchifyOptions = _merge(browserifyOptions, watchify.args),
    p = {
      entry: "./scripts/app.jsx",
      scss: "styles/main.scss",
      scssDir: "styles",
      vendor: {
        bs: {
          css: [
            "./node_modules/bootstrap/dist/css/bootstrap.min.css",
            "./node_modules/bootstrap/dist/css/bootstrap.css.map"
          ],
          js: [
            "./node_modules/bootstrap/dist/js/bootstrap.min.js",
            "./node_modules/bootstrap/dist/js/bootstrap.min.map"
          ]
        },
        fa: {
          css: [
            "./node_modules/font-awesome/css/font-awesome.min.css",
            "./node_modules/font-awesome/css/font-awesome.css.map"
          ],
          fonts: "./node_modules/font-awesome/fonts/**.*"
        },
        jq: [
          "./node_modules/jquery/dist/jquery.min.js",
          "./node_modules/jquery/dist/jquery.min.map"
        ]
      },
      bundle: "app.js",
      distJs: "dist/js",
      distCss: "dist/css",
      distFonts: "dist/fonts"
    };

var options = {
  server: {
    path: "./server/bin/www"
  },
  bs: {
    proxy: "localhost:5000"
  }
};

var serverFiles = [
  "./server/bin/www",
  "./server/**/*.js"
];

gulp.task("clean", function(cb) {
  del(["dist/*", "!dist/index.html"], cb);
});

gulp.task("server:start", function(done) {
  server.listen(options.server, function(err) {
    if (!err) {
      browserSync(options.bs);
    }
    done()
  });
});

gulp.task("server:restart", function(done) {
  server.restart(function(err) {
    if (!err) {
      browserSync.reload();
    }
    done();
  });
});

gulp.task("watchify", function() {
  var bundler = watchify(browserify(p.entry, watchifyOptions));

  function rebundle() {
    return bundler.
      bundle().
      on("error", notify.onError()).
      pipe(source(p.bundle)).
      pipe(gulp.dest(p.distJs)).
      pipe(reload({stream: true}));
  }

  bundler.transform(babelify).
    exclude("jquery").
    exclude("underscore").
    on("update", rebundle);
  return rebundle();
});

gulp.task("browserify", function() {
  return browserify(p.entry, browserifyOptions).
    exclude("jquery").
    exclude("underscore").
    transform(babelify).
    bundle().
    pipe(source(p.bundle)).
    pipe(buffer()).
    pipe(sourcemaps.init({loadMaps: true})).
    pipe(uglify()).
    pipe(sourcemaps.write("./")).
    pipe(gulp.dest(p.distJs));
});

gulp.task("styles", function() {
  return sass(p.scss, {sourcemap: true, cacheLocation: "./.tmp"}).
    on("error", notify.onError()).
    pipe(autoprefixer("last 1 version")).
    pipe(sourcemaps.init()).
    pipe(csso()).
    pipe(sourcemaps.write()).
    pipe(gulp.dest(p.distCss)).
    pipe(reload({stream: true}));
});

gulp.task("vendor", function() {
  var bsCssStream = gulp.src(p.vendor.bs.css).
    pipe(gulp.dest(p.distCss));

  var bsJsStream = gulp.src(p.vendor.bs.js).
    pipe(gulp.dest(p.distJs));

  var jqStream = gulp.src(p.vendor.jq).
    pipe(gulp.dest(p.distJs));

  var faCssStream = gulp.src(p.vendor.fa.css).
    pipe(gulp.dest(p.distCss));

  var faFontStream = gulp.src(p.vendor.fa.fonts).
    pipe(gulp.dest(p.distFonts));

  return merge(bsCssStream, bsJsStream, jqStream, faCssStream, faFontStream);
});

gulp.task("watchTask", function() {
  gulp.watch(p.scss, ["styles"]);
  gulp.watch("./dist/index.html").
    on("change", function() { browserSync.reload(); });
  gulp.watch(serverFiles, ["server:restart"]);
});

gulp.task("watch", function(done) {
  runSeq("clean", "browserify", "styles", "vendor", "server:start", ["watchify", "watchTask"], done);
});

gulp.task("build", function(done) {
  process.env.NODE_ENV = "production";
  runSeq("clean", ["styles", "vendor", "browserify"], done);
});

gulp.task("default", function() {
  console.log("Run \"gulp watch or gulp build\"");
});
