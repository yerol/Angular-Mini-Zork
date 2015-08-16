'use strict';

describe('Zork Game module', function () {

	beforeEach(module('Zork'));

	describe('Game module directive ', function () {
		var $compile, $rootScope, element;

		// Store references to $rootScope, $compile and $controller
		// so they are available to all tests in this describe block
		beforeEach(inject(function(_$compile_, _$rootScope_, _$controller_){
			// The injector unwraps the underscores (_) from around the parameter names when matching
			$compile = _$compile_;
			$rootScope = _$rootScope_;
		}));

		beforeEach(function() {
			// Compile a piece of HTML containing the directive
			element = $compile('<game class="game-container"><h1>Angular Js Mini Zork Game</h1></game>')($rootScope);
			// fire all the watches, so the scope expression {{1 + 1}} will be evaluated
			$rootScope.$digest();
		});

		it('should compile', function () {
			// Check that the compiled element contains the templated content
			expect(element.html()).toContain("Angular Js Mini Zork Game");
		});
	});

	describe('Game module controller ', function () {
		var $controller;

		beforeEach(inject(function(_$controller_){
			// The injector unwraps the underscores (_) from around the parameter names when matching
			$controller = _$controller_;
		}));

		describe('should have ', function() {
			var $scope, controller;

			beforeEach(function() {
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