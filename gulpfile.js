var gulp = require('gulp'),
	$ = require('gulp-load-plugins')();
	//module.exports = gulp;


/*
 * Default Tasks
 */
// http server
gulp.task('connect', function() {
	$.connect.server({
		root: ['./src'],
		port: 8000,
		livereload: true,
	});
});

// Reload server
gulp.task('html', ['hint'], function(){
	gulp.src('./src')
		.pipe($.connect.reload());
});
// Reload server
gulp.task('css', ['compass'], function(){
	gulp.src('./src')
		.pipe($.connect.reload());
});

// Validate HTML
gulp.task('hint', function() {
	gulp.src('./src/{,**/}*.html')
		.pipe($.htmlhint())
		.pipe($.htmlhint.reporter())
		.pipe($.htmlhint.failReporter())
		.on('error', $.notify.onError(function(error) {
			return error.message;
		}));
});

// Compile Compass
gulp.task('compass', function(){
	return gulp.src('./scss/*.scss')
				.pipe($.plumber())
				.pipe($.compass({
					//config_file: 'config.rb',
					comments: false,
					css: './src/css/',
					img: './src/images/',
					sass: './scss/'}))
				.on('error', $.notify.onError(function(error) {
					return error.message;
				}));
});

// Watch Files
gulp.task('watch',function(){
	gulp.watch(['./src/{,**/}*.html'],['html']);
	gulp.watch(['./scss/{,**/}*.scss'],['css']);
});


gulp.task('default', function() {
	gulp.run('connect', 'compass', 'watch');
});
