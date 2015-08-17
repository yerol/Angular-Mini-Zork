'use strict';

describe('Zork Game module', function () {

	beforeEach(module('Zork'));
	beforeEach(module('templates'));

	describe('Game module directive ', function () {
		var $compile, $rootScope, element, $httpBackend, $templateCache, template;

		var gameData = {
			locations: {
				0: {
					title: 'West of House',
					description: 'This is an open field west of a white house, with a boarded front door.',
					prompt: 'There is a small mailbox here. A rubber mat saying \'Welcome to Zork!\' lies by the door.',
					actions: [
						{
							command: 'enter the house',
							nextLocation: 1
						},
						{
							command: 'open the mailbox',
							prompt: 'There is a small parcel in the mailbox.'
						}
					]
				},
				1: {
					title: 'The Entrance Hall',
					description: 'You are standing in a tall room',
					prompt: 'A staircase leads up away from the room. A dusty old mirror is on the east facing wall.',
					actions: [
						{
							command: 'climb the stairs',
							nextLocation: 2
						},
						{
							command: 'look at room',
							prompt: 'Paintings from a long forgotten time adorn the walls and portray past members of the household. They appear to watch your every move.'
						},
						{
							command: 'look at me',
							prompt: 'You turn east-side and look at the mirror to see yourself. You look a bit tired.'
						}
					]
				},
				2: {
					title: 'Upstairs',
					description: 'Nothing here to see or do yet. Thanks for playing :)',
					prompt: 'The End.',
					actions: []
				}
			},
			commands: [
				{
					command: 'say',
					prompt: 'You say \'{message}\'',
					argument: '{message}'
				}
			]
		};

//		var triggerKeyDown = function (element, keyCode) {
//			var e = angular.element.Event("keydown");
//			e.which = keyCode;
//			element.trigger(e);
//		};

		// Store references to $rootScope, $compile and $controller
		// so they are available to all tests in this describe block
		beforeEach(inject(function (_$compile_, _$rootScope_, _$templateCache_) {
			// The injector unwraps the underscores (_) from around the parameter names when matching
			$compile = _$compile_;
			$rootScope = _$rootScope_;
			$templateCache = _$templateCache_;
		}));

		beforeEach(inject(function ($injector) {
			// Set up the mock http service responses
			$httpBackend = $injector.get('$httpBackend');
			// backend definition common for all tests
			$httpBackend.when('GET', 'data/game-data.json').respond(200, gameData);
		}));

		beforeEach(function () {
			template = $templateCache.get('modules/game/game.html');
			// Compile a piece of HTML containing the directive
			element = $compile(template)($rootScope);
			// fire all the watches, so the scope expression {{1 + 1}} will be evaluated
			$rootScope.$digest();
		});

		it('should compile', function () {
			// Check that the compiled element contains the templated content
			expect(element.find('textarea')[0].value).toContain('Angular Mini ZORK');
		});
	});

	describe('Game module controller ', function () {
		var $controller;

		beforeEach(inject(function (_$controller_) {
			// The injector unwraps the underscores (_) from around the parameter names when matching
			$controller = _$controller_;
		}));

		describe('should have ', function () {
			var $scope, controller;

			beforeEach(function () {
				$scope = {};
				controller = $controller('Modules.Game.Controller', { $scope: $scope });
			});

			it('a controller', function () {
				expect(controller).toBeDefined();
			});

			it('an onDestroy handler', function () {
				expect(controller.onDestroy).toBeDefined();
			});
		});
	});
});
