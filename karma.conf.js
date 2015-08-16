var sharedConfig = require('./karma.conf.shared');

module.exports = function (config) {
	'use strict';

	sharedConfig(config);

	config.set({
		coverageReporter: {
			reporters: [
				{
					type: 'lcov',
					dir: 'test/coverage',
					subdir: function (browser) {
						return browser.toLowerCase().split(/[ /-]/)[0];
					}
				},
				{
//					type: 'text',
					type: 'text-summary',
					dir: 'test/coverage'
				}
			]
		},

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: ['Chrome', 'PhantomJS'],

		plugins: [
			'karma-chrome-launcher',
			'karma-firefox-launcher',
			'karma-phantomjs-launcher',
			'karma-jasmine',
			'karma-jasmine-matchers',
			'karma-coverage',
			'karma-ng-html2js-preprocessor'
		]
	});
};
