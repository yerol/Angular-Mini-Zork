// Declare app level module which depends on views, and components
angular.module('Zork', [
	'ngRoute',
	'Modules.Game'
]).
config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	'use strict';

	// Making sure we don't end up having a hashbang in the url
	$locationProvider.html5Mode(true);

	// Setup the default and only route to the game
	$routeProvider
		.when('/', {
			templateUrl: 'modules/game/game.html'
		})
		.otherwise({redirectTo: '/'});
}]);
