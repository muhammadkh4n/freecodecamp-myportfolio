var gulp           = require('gulp');
var browserSync    = require('browser-sync');
var path           = require('path');
var less           = require('gulp-less');
var LessAutoPrefix = require('less-plugin-autoprefix');
var autoprefix     = new LessAutoPrefix({ browsers: ['last 18 versions'] });

// static server
gulp.task('serve', ['less'], function() {
  browserSync.init({
    server: {
      baseDir: "./public"
    }
  });

  gulp.watch('less/**/*.less', ['less']);
  gulp.watch('public/*.html').on('change', browserSync.reload);
  gulp.watch('public/**/*.js').on('change', browserSync.reload);
});

// Compile less to css.
gulp.task('less', function () {
  return gulp.src('./less/style.less')
    .pipe(less({
      //paths: [ path.join(__dirname, 'less', 'includes') ],
      plugins: [autoprefix]
    }))
    .on('error', handleError)
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
});

// Default gulp task.
gulp.task('default', ['serve']);


function handleError(e) {
  console.log(e.toString());
  this.emit('end');
}
