var sharedConfig = require('./karma.conf.shared');

module.exports = function (config) {
	'use strict';

	sharedConfig(config);

	config.set({
		coverageReporter: {
			reporters: [
				{
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
		browsers: ['PhantomJS']
	});
};
