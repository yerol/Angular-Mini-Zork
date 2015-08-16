exports.config = {
	allScriptsTimeout: 11000,

	specs: [
		'*.js'
	],

// configure multiple browsers to run tests
//	multiCapabilities: [
//		{
//			'browserName': 'firefox'
//		},
//		{
//			'browserName': 'chrome'
//		}
//	],

	// configure a single browser
	capabilities: {
		browserName: 'chrome'
	},

	baseUrl: 'http://localhost:8000',

	framework: 'jasmine',

	jasmineNodeOpts: {
		defaultTimeoutInterval: 30000
	}
};
