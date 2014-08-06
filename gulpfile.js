var gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
	sass = require('gulp-ruby-sass');

/*
 * Default Tasks
 */
// http server
gulp.task('webserver', function() {
  gulp.src('./src')
    .pipe($.webserver({
		livereload: true,
		directoryListing: false,
		fallback: 'index.html'
    }));
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

// Compile Sass
gulp.task('css', function() {
	return gulp.src('./scss/{,**/}*.scss')
		.pipe($.plumber())
		.pipe(sass({
			style : 'compact',
			lineNumbers : true
		}))
		.on('error', function(error) {
			$.notify().write(error.message);
		})
		.pipe($.pleeease({
			fallbacks: {
				autoprefixer: ['last 4 versions'],
				rem: false
			},
			optimizers: {
				minifier: false
			}
		}))
		.pipe($.cssbeautify({
			indent: '\t',
			openbrace: 'end-of-line',
			autosemicolon: false
		}))
		.pipe(gulp.dest('./src/css/'));
});

// Watch Files
gulp.task('watch',function(){
	gulp.watch(['./src/{,**/}*.html'],['hint']);
	gulp.watch(['./scss/{,**/}*.scss'],['css']);
});


// Set Defalt
gulp.task('default', ['webserver', 'css', 'watch']);
