const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const debug = require('gulp-debug');
const map = require("gulp-sourcemaps");

gulp.task('makeCss',function(){
	return gulp.src('sass/main.scss')
		.pipe(debug({title:'source'}))
		.pipe(map.init())
		.pipe(sass())
		.pipe(map.write())
		.pipe(gulp.dest('css'));
});


gulp.task('serve',function(){
	browserSync.init({
		server:'../',
		index:"index.html"
	});

	browserSync.watch('../').on('change', browserSync.reload);
});



gulp.task('watch',function(){
	gulp.watch('sass/**/*.scss',
		gulp.series('makeCss')
	);

});


gulp.task('dev',gulp.series('makeCss',gulp.parallel('watch','serve')));

