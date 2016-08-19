var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var path = require('path');

/* image min */
gulp.task('imagemin', () =>
	gulp.src('app/img/*.*')
		.pipe(imagemin())
		.pipe(gulp.dest('app/img'))
);

// Static Server + watching scss/html files
gulp.task('serve', ['less'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/less/**/*.less", ['less']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

/* less & autoprefixer */
gulp.task('less', function () {
  return gulp.src('./app/less/style.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(autoprefixer({
        browsers: ['last 12 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.stream());
});

/* default Task */
gulp.task('default', ['serve']);
gulp.task('images', ['imagemin']);
