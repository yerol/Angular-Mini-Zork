angular.module('Modules.Game')
	.service('Modules.Game.Factory', [function () {
		'use strict';

		var context = {
			appendText : function(model, text) {
				model.consoleText += "\n" + text;
			},

			validateGameData : function(model) {
				return model && model.gameData && angular.isObject(model.gameData.locations);
			},

			moveToLocation : function(model, locationId) {
				if(locationId >= 0) {
					var location = model.gameData.locations[locationId];
					if(angular.isObject(location)) {
						context.appendText(model, location.title);
						context.appendText(model, location.description);
						context.appendText(model, location.prompt);

						return true;
					}
				}
				return false;
			},

			listActions : function(model, locationId) {
				var location = model.gameData.locations[locationId];
				if(angular.isObject(location) && angular.isArray(location.actions)) {
					context.appendText(model, "Available actions:");

					for (var i = 0, len = location.actions.length; i < len; i++) {
						context.appendText(model, location.actions[i].command);
					}
				}
				else {
					context.appendText(model, "No available actions.");
				}
			},

			takeAction : function(model, userInput) {

			},

			executeCommand : function(model) {
				context.appendText(model, model.userInput);

				if(model.userInput === '/?') {
					context.listActions(model, model.currentLocation);
				}
				else {
					context.takeAction(model, model.userInput);
				}

				model.userInput = '';
			}
		};

		return context;
	}]);
