// Creating the Game module and defining the Game directive
// which bridges the template and controller without depending on ng-controller (using controllerAs syntax)
angular.module('Modules.Game', [])
	.directive('game', [
	function () {
		'use strict';

		return {
			restrict: 'E',
			controllerAs: 'gameController',
			controller: 'Modules.Game.Controller',
			link: function (scope, element, attrs, ctrl) {
				// Call controller's destroy event on scope.$destroy so we can clean up any resources used/created
				scope.$on('$destroy', ctrl.onDestroy);
			}
		};
	}
]);
