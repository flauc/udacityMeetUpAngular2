var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    autoprefixer = require('gulp-autoprefixer'),

    config = {
        stylus: './styles',
        stylusMain: './styles/style.styl'
    };

// Stylus Task
gulp.task('stylus', function() {
    gulp.src(config.stylusMain)
        .pipe(stylus())
        .pipe(autoprefixer({browsers: ['last 2 version']}))
        .pipe(gulp.dest('./'));
});

// Watch Task
gulp.task('watch', function() {
    gulp.watch(config.stylus, ['stylus']);
});