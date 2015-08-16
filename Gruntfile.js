module.exports = function (grunt) {

	'use strict';

	grunt.initConfig({
		clean: {
			less: [
				'app/**/*.css',
				'!test/**/*.css',
				'!app/bower_components/**/*.css'
			]
		},

		watch: {
			less: {
				options: {
					spawn: false // spawn has to be FALSE if we want to be able to compile only the file changed
				},
				files: [
					// Include
					'app/**/*.less',
					// Exclude
					'!app/bower_components/**/*.less'
				],
				tasks: ['less:dev', 'autoprefixer:all']
			},
			jshint: {
				options: {
					spawn: false // spawn has to be FALSE if we want to be able to compile only the file changed
				},
				files: [
					'app/**/*.js',
					'!app/bower_components/**/*.js'
				],
				tasks: ['newer:jshint:source']
			},
			jscs: {
				options: {
					spawn: false // spawn has to be FALSE if we want to be able to compile only the file changed
				},
				files: [
					'Gruntfile.js',
					'karma.conf.js',
					'app/**/*.js',
					'test/e2e-tests/**/*.js',
					'test/unit/**/*.js',
					// excludes
					'!app/bower_components/**/*.js'
				],
				tasks: ['newer:jscs']
			}
		},

		less: {
			// Development options
			dev: {
				options: {
					compress: false
				},
				files: [
					{
						'app/css/app.css': 'app/css/app.less'
					},
					{
						expand: true,
						src: [
							'app/modules/**/*.less',
							// exclude list
							'!app/bower_components/**/*.less',
							'!app/**/_*.less'
						],
						ext: '.css'
					}
				]
			},
			// Production options
			dist: {
				options: {
					compress: true
				}
			}
		},

		autoprefixer: {
			all: {
				expand: true,
				options: {
					cascade: false
				},
				src: [
					'app/css/app.css',
					'app/modules/**/*.css'
				]
			}
		},

		jshint: {
			// Shared config for all shared goals
			options: {
				reporter: require('jshint-stylish')
			},
			source: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: [
					'app/**/*.js',
					// excludes
					'!app/bower_components/**/*.js'
				]
			},
			unit: {
				options: {
					jshintrc: 'test/.jshintrc'
				},
				src: [
					'test/unit/**/*.js',
					// exclude
					'!test/coverage/**/*.js',
					'!test/helpers/**/*.js'
				]
			}
		},

		uglify: {
			options: {
				mangle: false,
				compress: {
					drop_console: true // jscs:disable
				}
			},
			all: { // jscs:disable
				files: {
					// 'file.js': ['folder/file.js'],
				}
			}
		},

		karma: {
			unit: {
				configFile: 'karma.conf.js',
				singleRun: true
			},
			auto: {
				configFile: 'karma.conf.auto.js',
				autoWatch: true
			}
		},

		concurrent: {
			options: {
				logConcurrentOutput: true
			},
			dev: {
				tasks: ['watch:less', 'watch:jshint', 'watch:jscs']
			}
		},

		jscs: {
			src: [
				'Gruntfile.js',
				'karma.conf.js',
				'app/**/*.js',
				'test/e2e-tests/**/*.js',
				'test/unit/**/*.js',
				// excludes
				'!app/bower_components/**/*.js'
			],
			options: {
				config: true,
				force: false,
				reporter: 'test/helpers/jscs/jscs-html-reporter',
				reporterOutput: 'test/coverage/jscs/code-style-errors.html'
			}
		},

		bowercopy: {
			options: {
				// Removes bower components folder defined in .bowerrc
				clean: true,
				// Since we are running bower install in the initialize phase already,
				// there is no need for this plugin to run it again
				runBower: false
			},
			plugins: {
				options: {
					// Folder prefix for the copied files below
					destPrefix: 'app/bower_components'
				},
				files: {
					// LEFT HAND SIDE IS THE TARGET, RIGHT IS THE SOURCE

					'jquery/dist/jquery.min.js': 'jquery/dist/jquery.min.js',
					'jquery/dist/jquery.min.map': 'jquery/dist/jquery.min.map',

					'angular/angular.min.js': 'angular/angular.min.js',
					'angular/angular.min.js.map': 'angular/angular.min.js.map',

					'angular-route/angular-route.min.js': 'angular-route/angular-route.min.js',
					'angular-route/angular-route.min.js.map': 'angular-route/angular-route.min.js.map',

					'angular-mocks/angular-mocks.js': 'angular-mocks/angular-mocks.js',

					"bootstrap/dist/fonts" : "bootstrap/dist/fonts/*.*",
					"bootstrap/dist/js/bootstrap.min.js" : "bootstrap/dist/js/bootstrap.min.js",
					"bootstrap/dist/css/bootstrap.min.css" : "bootstrap/dist/css/bootstrap.min.css",
					"bootstrap/less/variables.less" : "bootstrap/less/variables.less",
					"bootstrap/less/mixins" : "bootstrap/less/mixins/*.less",
					"bootstrap/less/mixins.less" : "bootstrap/less/mixins.less"
				}
			}
		},

		connect: {
			options: {
				hostname: 'localhost'
			},
			dev: {
				options : {
					port : 9000,
					keepalive : true,
					base : 'app',
					open : 'http://localhost:9000'
				}
			},
			test: {
				options: {
					port : 8000,
					keepalive: false,
					base : 'app'
				}
			}
		},

		protractor: {
			options: {
				configFile: "test/e2e-tests/protractor.conf.js",
				keepAlive: true, // If false, the grunt process stops when the test fails.
				noColor: false, // If true, protractor will not use colors in its output.
				args: {}
			},
			all: { // Grunt requires at least one target to run so you can simply put 'all: {}' here too.
				options: {
					configFile: "test/e2e-tests/protractor.conf.js", // Target-specific config file
					keepAlive: false,
					args: {}
				}
			}
		}
	});

	// Load all modules from package.json which name starts with 'grunt-'. Very helpful to avoid having to loadNpmTasks
	// for every grunt module
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// REGISTERING TASKS

	// Start local web server for development
	grunt.registerTask('start', ['connect:dev']);

	// Start watchers for jshint, jscs, less and karma
	grunt.registerTask('dev', ['concurrent:dev', 'karma:auto']);

	// Validate code styles and run unit tests
	grunt.registerTask('test', ['jshint:source', 'karma:unit', 'jscs']);

	// Runs all protractor specs for end to end testing
	grunt.registerTask('e2e', ['connect:test', 'protractor:all']);

	// Generate CSS from LESS source.
	grunt.registerTask('css', ['less', 'autoprefixer']);

	// For running karma tests automatically as files change.
	grunt.registerTask('autotest', ['karma:auto']);
};
