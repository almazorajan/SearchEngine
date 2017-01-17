"use strict";

const gulp = require("gulp");
const clean = require("gulp-clean");
const concat = require("gulp-concat");
const minify = require("gulp-minify");
const open = require("gulp-open");
const runSequence = require("run-sequence");

gulp.task("clean", function () {
    return gulp
        .src("dist", { read: false })
        .pipe(clean());
});

gulp.task("concat", function () {
    return gulp
        .src("app/**/**.js")
        .pipe(concat("app.js"), { newLine: ";" })
        .pipe(gulp.dest('dist'));
});

gulp.task("minify", function () {
    return gulp
        .src("dist/app.js")
        .pipe(minify())
        .pipe(gulp.dest("dist"))
});

gulp.task("open", function(){
   return gulp
        .src("/")
        .pipe(open({uri: "http://localhost:8080/" }));
});

gulp.task("default", function() {
    runSequence("clean", "concat", "minify", "open");
});
