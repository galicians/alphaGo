module.exports = function() {
	var wiredep = require('wiredep');
	var bowerFiles = wiredep({devDependencies: true})['js'];

	// all js files we want to check
	var config = {
		//file paths

		alljs : [
				'./*.js',
				'!' + './client/js/vendor/*.js',
				'./client/js/**/*.js',
				'./client/app/payment/payment-options-controller.js',
				'./client/app/payment/modalAddPaySource-controller.js',
				'./client/app/common/contact-validation-service.js',
				'!' + './client/js/plugins/**/*.js'
				],
		build: './build/',
		client: './client',
		css: './.tmp/styles.css',
		e2e: './client/e2e/*.spec.js',
		mainCSS: ['./client/css/**/*.*', './client/css/themes/*.*' , '!' + './client/css/*.less', '!' + './client/css/*.sass'],
		fonts: './client/fonts/*.*',
		html: './client/**/*.html',
		htmltemplates: ['./client/**/*.html', '!' + './client/coverage/**/*.html'],
		images: './client/img/*.*',
		index: './client/index.html',
		js: [
			'!' + 'bower_components/jquery/dist/jquery.min.js',
			'./bower_components/moment/min/moment-with-locales.min.js',
			'./client/**/*.module.js',
			'./client/**/*.js',
			'./client/app/common/contact-validation-service.js',
			'!' + './client/**/*.spec.js',
			'!' + './client/coverage/**/*.js'
			],
		jsOrder: [
			'**/app.module.js',
			'**/*.module.js',
			'**/*.js'
		],
		languages: './lang/*.json',
		less: './client/css/styles.less',
		sassPath: './client/scss/**/*.scss',
		server: './server',
		temp: './.tmp/',

		templateCache: {
			file: 'templates.js',
			options: {
				module: 'neuboard',
				standAlone: false,
				root: '/'
			}
		},
		tomcatConf: ['./client/WEB-INF/web.xml'],
		tomcatJsp: ['./client/index.jsp'],
		browserReloadDelay: 1000,
		//Bower and NPM locations
		bower: {
			json: require('./bower.json'),
			directory: './bower_components/',
			ignorePath: '..'
		},
		//node settings
		defaultPort: 5700,
		nodeServer: './server/index.js'
	};

	config.getWiredepDefaultOptions = function() {
		var options = {
			bowerJson: config.bower.json,
			directory: config.bower.directory,
			ignorePath: config.bower.ignorePath
		};
		return options;
	};

	config.karma = getKarmaOptions();

	return config;

	/////////////

	function getKarmaOptions() {
		var options = {
			files: [].concat(
				bowerFiles,
				'./client/app/**/*.module.js',
				'./client/app/**/*.js',
				'./.tmp/templates.js',
				'./client/app/common/promise-template.html',
				'./client/app/common/datapicker.html'
				),
			exclude: [],
			coverage: {
				dir: './report/coverage',
				reporters: [
					{type: 'html', subdir: 'report-html'},
					{type: 'lcov', subdir: 'report-lcov'},
					{type: 'text-summary'}
				]
			},
			preprocessors: {
				'./client/app/common/promise-template.html':['ng-html2js']
			},
			ngHtml2JsPreprocessor: {
				stripPrefix: 'client/'
			}

		};
		options.preprocessors['./client/**/!(vendor)/!(*.spec)+(.js)'] = ['coverage'];
		return options;
	}
};

