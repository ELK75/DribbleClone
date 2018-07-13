var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSynch = require('browser-sync').create();

gulp.task('watch', function() {

    browserSynch.init({
        notify: false,
        server: {
            baseDir: "app"
        }
    });

    watch('./app/index.html', function() {
        browserSynch.reload();
    });

    watch('./app/assets/styles/**/*.css', function() {
        console.log('here');
        gulp.start('cssInject');
    });
});

gulp.task('cssInject', ['styles'], function() {
    return gulp.src('./app/temp/styles/styles.css')
        .pipe(browserSynch.stream());
});