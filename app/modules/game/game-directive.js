// Defining the Game directive
// which bridges the template and controller without depending on ng-controller (using controllerAs syntax)
angular.module('Modules.Game')
	.directive('game', ['$window', function ($window) {
		'use strict';

		return {
			restrict: 'E',
			controllerAs: 'gameController',
			controller: 'Modules.Game.Controller',
			link: function (scope, element, attrs, ctrl) {
				var my = {
					// Cache the input element
					// Set the initial  focus on the input to accept keyboard input
					input : element.find('.game-input').focus(),
					// Cache the console textarea
					textarea : element.find('.game-console-textbox')
				};

				// Attach an event handler for input blur that sets the focus back to the input
				my.input.on('blur', function() {
					my.input.focus();
				});

				// Attach an event handler for window click that sets the focus back to the input
				angular.element($window).on('click', function() {
					my.input.focus();
				});

				// When the userInput changes, set the console scroll bar to the bottom
				scope.$watch(function() { return ctrl.model.userInput; }, function() {
					my.textarea.scrollTop(my.textarea[0].scrollHeight);
				});

				// Kick off the app
				ctrl.initialize();

				// Call controller's destroy event on scope.$destroy so we can clean up any resources used/created
				scope.$on('$destroy', ctrl.onDestroy);
			}
		};
	}
]);
