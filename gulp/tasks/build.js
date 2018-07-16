var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
broswerSynch = require('browser-sync').create();

gulp.task('previewDist', function() {
    broswerSynch.init({
        notify: false,
        server: {
            baseDir: "docs"
        }
    });
});

gulp.task('copyFonts', ['deleteDistFolder'], function() {
    return gulp.src("./app/assets/styles/fonts/**")
        .pipe(gulp.dest("./docs/assets/styles/fonts/"));
})

gulp.task('deleteDistFolder', function() {
    return del('./docs');
});

gulp.task('optimizeImages', ['deleteDistFolder'], function() {
    return gulp.src('./app/assets/images/**/*')
        .pipe(imagemin({
            progressive: true,
            iterlaced: true,
            multipass: true
        }))
        .pipe(gulp.dest("./docs/assets/images"));
});

gulp.task('useminTrigger', ['deleteDistFolder'], function() {
    gulp.start("usemin");
});

gulp.task('usemin', ['styles'], function() {
    return gulp.src("./app/index.html")
        .pipe(usemin({
            css: [function() {return rev()}, function() {return cssnano()}],
            js: [function() {return rev()}, function() {return uglify()}]
        }))
        .pipe(gulp.dest("./docs"));
});

gulp.task('build', ['deleteDistFolder', 'copyFonts', 'optimizeImages', 'useminTrigger']);
