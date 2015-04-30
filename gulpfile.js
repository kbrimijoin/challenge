var gulp = require('gulp');
var uglify = require('gulp-uglify');
var ejs = require('gulp-ejs');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var mainBowerFiles = require('main-bower-files');
var path = require('path');
var browserSync = require('browser-sync');

// set configuration
var config = {
    bowerDir: './bower_components'
};

// html
gulp.task('html', function () {
    var pages = gulp.src('./src/html/*.html')
        .pipe(gulp.dest('public'));
});

//js
gulp.task('js', function() {
  return gulp.src('./src/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
});

// less
gulp.task('less', function () {
  return gulp.src('./src/less/**/*.less')
    .pipe(sourcemaps.init())
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'partials') ]
    }))
    .pipe(sourcemaps.write())
    .pipe(minifyCSS())
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