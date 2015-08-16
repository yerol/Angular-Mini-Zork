angular.module('Modules.Game')
	.service('Modules.Game.Service', ['$http', function ($http) {
		'use strict';

		var my = {
			dataUrl : 'data/game-data.json'
		};

		return {
			fetchData : function() {
				return $http({
					url: my.dataUrl,
					method: 'GET'
				});
			}
		};
	}]);
