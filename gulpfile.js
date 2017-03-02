'use strict';

// Requis
var gulp = require('gulp');

// Include plugins
var sass = require('gulp-sass'); // plugin sass
var twig = require('gulp-twig'); // plugin twig
var imageop = require('gulp-image-optimization'); // plugin image
var csso = require('gulp-csso'); // plugin css minify
var rename = require("gulp-rename"); // plugin rename files
var minifyCss = require('gulp-clean-css'); // plugin minifies css

// Compile Sass
gulp.task('css', function () {
  gulp.src('src/assets/scss/style.scss') // source files
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/assets/css/')); // destination files
});

// Compile Twig templates to HTML
gulp.task('html', function() {
   gulp.src('src/*.html') // source files
        .pipe(twig())
        .pipe(gulp.dest('./dist')); // destination files
});

//Compress image
gulp.task('images', function(cb) {
    gulp.src(['src/assets/images/**']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('./dist/assets/images')).on('end', cb).on('error', cb);
});

// Minify css
gulp.task('minify', function () {
  gulp.src('src/assets/scss/style.scss')                          //reads all the SASS files
    .pipe(sass().on('error', sass.logError))  //compiles SASS to CSS and logs errors
    .pipe(minifyCss())                        //minifies the CSS files
    .pipe(rename({              //renames the concatenated CSS file
      basename : 'style',       //the base name of the renamed CSS file
      extname : '.min.css'      //the extension fo the renamed CSS file
    }))
    .pipe(gulp.dest('./dist/assets/css/')); //writes the renamed file to the destination
});

//gulp compile
gulp.task('compile', ['images','html','minify']);