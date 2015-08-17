// Service used to download the Game Data
angular.module('Modules.Game')
	.service('Modules.Game.Service', ['$http', function ($http) {
		'use strict';

		var my = {
			// Path to game data json
			dataUrl: 'data/game-data.json'
		};

		return {
			/**
			 * Method that fetches game data
			 */
			fetchData: function () {
				return $http({
					url: my.dataUrl,
					method: 'GET'
				});
			}
		};
	}]);
