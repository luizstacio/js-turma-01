var gulp = require('gulp');
var gulpfy = require('gulp-uglify');

gulp.task('mini', function () {
	gulp.src('./app.js')
		.pipe(gulpfy())
		.pipe(gulp.dest('./dist'));
})

gulp.task('default', function () {
	gulp.watch('./app.js', ['mini']);
})