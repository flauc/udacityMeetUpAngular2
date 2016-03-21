var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    autoprefixer = require('gulp-autoprefixer'),
    rimraf = require('gulp-rimraf'),
    inject = require('gulp-inject');

    config = {
        stylus: './styles/**/**.styl',
        stylusMain: './styles/style.styl',
        vendorJs1: [
            'node_modules/angular2/bundles/angular2-polyfills.min.js',
            'node_modules/es6-shim/es6-shim.min.js',
            'node_modules/systemjs/dist/system.src.js'
        ],
        vendorJs2: [
            'node_modules/rxjs/bundles/Rx.js',
            'node_modules/angular2/bundles/angular2.js',
            'node_modules/angular2/bundles/router.js'
        ],
        production1: [
            './production/vendor/angular2-polyfills.min.js',
            './production/vendor/es6-shim.min.js',
            './production/vendor/system.src.js'
        ],
        production2: [
            './production/vendor/bundles/Rx.js',
            './production/vendor/angular2.js',
            './production/vendor/router.js'
        ]

    };

// Stylus Task
gulp.task('stylus', function() {
    gulp.src(config.stylusMain)
        .pipe(stylus())
        .pipe(autoprefixer({browsers: ['last 2 version']}))
        .pipe(gulp.dest('./'));
});

// Inject Vendor
gulp.task('inject', function() {
    gulp.src('index.html')
        .pipe(inject(gulp.src(config.vendorJs1, {read: false}), {starttag: '<!-- inject:ven1:{{ext}} -->', addRootSlash: false}))
        .pipe(inject(gulp.src(config.vendorJs2, {read: false}), {starttag: '<!-- inject:ven2:{{ext}} -->', addRootSlash: false}))
        .pipe(gulp.dest('./'));
});


// Production build
gulp.task('move-prod', ['stylus'], function() {
    gulp.src(config.vendorJs1)
        .pipe(gulp.dest('./production/vendor'));
    gulp.src(config.vendorJs2)
        .pipe(gulp.dest('./production/vendor'));
    gulp.src('./app/**')
        .pipe(gulp.dest('./production/app'));
    gulp.src('index.html')
        .pipe(gulp.dest('./production'));
    gulp.src('style.css')
        .pipe(gulp.dest('./production'));
});

// Removes all the unnecessary ts files
gulp.task('clean-ext', function() {
    gulp.src('./production/**/**.ts', { read: false })
        .pipe(rimraf())
});

//Inject task
gulp.task('inject-prod', function() {
    gulp.src('./production/index.html')
        .pipe(inject(gulp.src(config.production1, {read: false}), {starttag: '<!-- inject:ven1:{{ext}} -->', relative: true}))
        .pipe(inject(gulp.src(config.production2, {read: false}), {starttag: '<!-- inject:ven2:{{ext}} -->', relative: true}))
        .pipe(gulp.dest('./production'));
});

// Cleans the production folder when we dont need it
gulp.task('clean-prod', function() {
    gulp.src('./production', { read: false })
        .pipe(rimraf())
});

// Watch Task
gulp.task('watch', function() {
    gulp.watch(config.stylus, ['stylus']);
});