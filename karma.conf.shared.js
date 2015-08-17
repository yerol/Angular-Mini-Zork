module.exports = function (config) {
	'use strict';

	config.set({

		basePath: './',

		files: [
			'app/bower_components/jquery/dist/jquery.min.js',
			'app/bower_components/angular/angular.min.js',
			'app/bower_components/angular-route/angular-route.min.js',
			'app/bower_components/angular-resource/angular-resource.min.js',
			'app/bower_components/angular-mocks/angular-mocks.js',
			'app/bower_components/bind-polyfill/index.js',
			'app/modules/**/*.html',
			'app/js/app.js',
			'app/modules/**/*.js',
			'test/**/*.js'
		],

		// list of files to exclude
		exclude: [
			'app/bower_components/bootstrap/**/*.js',
			'test/e2e-tests/**/*.js',
			'test/coverage/**/*.js',
			'test/helpers/**/*.js'
		],

		autoWatch: true,

		// test results reporter to use
		// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
		reporters: ['progress', 'coverage'],

		preprocessors: {
			'app/!(bower_components)/**/*.js': ['coverage'],
			'app/modules/**/*.html': ['ng-html2js']
		},

		frameworks: [
			'jasmine',
			// jasmine-matchers must be loaded after jasmine
			'jasmine-matchers'
		],

		ngHtml2JsPreprocessor: {
			stripPrefix: 'app/',
			moduleName: 'templates'
		},

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 30000,

		// Increase timeout to avoid problems in some windows machine when running the tests with phantomjs
		browserNoActivityTimeout: 60000
	});
};

