var gulp = require('gulp');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')({lazy: true});
// var config = require('./gulp.config')();

gulp.task('serve-dev', ['inject'], function() {
	serve(true /* isDev */);
});

gulp.task('inject',  function() {
	console.log('Wire up the app css into the html, and call wiredep ');

	return gulp
		.src('./client/index.html')
		// .pipe($.inject(gulp.src(config.css)))
		.pipe(gulp.dest('./client'));
});

////////////

function serve(isDev) {

	var nodeOptions = {
		script: './server/index.js',
		delayTime: 1,
		env: {
			'PORT': 5100,
			'NODE_ENV': isDev ? 'dev' : 'build'
		},
		watch: ['./server']
	};
	return $.nodemon(nodeOptions)
		.on('restart', function(ev) {
			console.log('*** nodemon restarted');
			console.log('files changed on restart:\n' + ev);
			setTimeout(function() {
				browserSync.notify('reloading now ...');
				browserSync.reload({stream: false});
			}, 1000);
		})
		.on('start', function() {
			console.log('*** nodemon started');
			startBrowserSync(isDev);
		})
		.on('crash', function() {
			console.log('*** nodemon crashed: script crashed for some reason');
		})
		.on('exit', function() {
			console.log('*** nodemon exited cleanly');
		});
}

function startBrowserSync(isDev) {

	if (browserSync.active) {
		return;
	}

	log('Starting browser-sync on port ' + port);

	if (isDev) {
		gulp.watch(['./client/index.html'], [ browserSync.reload])
			.on('change', function(event) { changeEvent(event); });
	} else {
		gulp.watch(['./client/index.html'], [ browserSync.reload])
			.on('change', function(event) { changeEvent(event); });
	}

	var options = {
		proxy: 'localhost:' + port,
		port: 4000,
		files: isDev ? [
			'./client/**/*.*'
		] : [],
		ghostMode: {
			clicks: false,
			location: false,
			forms: false,
			scroll: false
		},
		injectChanges: true,
		logFileChanges: true,
		logLevel: 'debug',
		logPrefix: 'gulp-patterns',
		notify: true,
		reloadDelay: 0
	};

	browserSync(options);
}