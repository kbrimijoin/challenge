var gulp = require('gulp');
var uglify = require('gulp-uglify');
var ejs = require('gulp-ejs');
var ejsTemplate = require('gulp-ejs-template');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var mainBowerFiles = require('main-bower-files');
var path = require('path');
var browserSync = require('browser-sync');
var del = require('del');

var templateData = require('./data/template-data.json');

// set configuration
var config = {
    bowerDir: './bower_components'
};

// html
gulp.task('html', ['clean-html'], function () {
    var pages = gulp.src('./src/html/*.html')
        .pipe(ejs(templateData))
        .pipe(gulp.dest('public'));
});

//js
gulp.task('js', ['clean-js'], function() {
  return gulp.src('./src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
});

// less
gulp.task('less', ['clean-css'], function () {
  return gulp.src('./src/less/*.less')
    .pipe(less())    
    .pipe(gulp.dest('./public/css'));
});

gulp.task('bower', function() {
  return gulp.src(mainBowerFiles(), {
      base: 'bower_components'
    })
    .pipe(gulp.dest('./public/lib'));
});

// images
gulp.task('img', function() {
    return gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./public/img'));
});

// fonts
gulp.task('fonts', function() {    
    return gulp.src(['./src/fonts/**/*'])
        .pipe(gulp.dest('./public/fonts'));
});

// clean 
gulp.task('clean-html', function(done) {
    del(['./build/*.html'], done);
});

gulp.task('clean-js', function(done) {
    del(['build/js/**/*.*'], done);
});

gulp.task('clean-css', function(done) {
    del(['build/css/**/*.*'], done);
});

//browser-sync will reload when compiled versions change
gulp.task('browser-sync', function() {
    return browserSync.init(['./public/*.html', './public/css/*.css', './public/js/*.js'], {
        server: {
            baseDir: './public'
        }
    });
});


gulp.task('default', ['html', 'js', 'less', 'bower', 'img', 'fonts', 'browser-sync'], function() {
  	// watch and recompile
    gulp.watch(['src/html/**/*.html'], ['html', browserSync.reload]);
    gulp.watch('src/js/**/*.js', ['js', browserSync.reload]);
    gulp.watch('src/less/**/*.less', ['less', browserSync.reload]);
    gulp.watch('src/img/**/*', ['img', browserSync.reload]);
    gulp.watch('src/fonts/**/*', ['font', browserSync.reload]);
});