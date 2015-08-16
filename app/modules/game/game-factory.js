// Factory service that contains helper methods for Game controller
angular.module('Modules.Game')
	.service('Modules.Game.Factory', [function () {
		'use strict';

		var context = {
			/**
			 * Helper method that appends given text to the console text
			 * @param {object} model - Game controller data model
			 * @param {string} text - Text to be appended
			 */
			appendText : function(model, text) {
				model.consoleText += '\n' + text;
			},

			/**
			 * Helper method that validates game data
			 * @param {object} model - Game controller data model
			 */
			validateGameData : function(model) {
				return model && model.gameData && angular.isObject(model.gameData.locations);
			},

			/**
			 * Helper method that finds the given location and moves the player
			 * @param {object} model - Game controller data model
			 * @param {number} locationId - Location to be moved to
			 */
			moveToLocation : function(model, locationId) {
				if(locationId >= 0) {
					// Find the location by id
					var location = model.gameData.locations[locationId];
					// Validate it
					if(angular.isObject(location)) {
						// Set the current location to the new id
						model.currentLocation = locationId;

						// Display the title, description and prompt to the player
						context.appendText(model, location.title);
						context.appendText(model, location.description);
						context.appendText(model, location.prompt);

						return true;
					}
				}
				return false;
			},

			/**
			 * Helper method that displays the available actions to the player
			 * @param {object} model - Game controller data model
			 */
			listActions : function(model) {
				// Find the location by id and validate it
				var location = model.gameData.locations[model.currentLocation];
				if(angular.isObject(location) && angular.isArray(location.actions) && location.actions.length > 0) {
					// List the available actions in this location
					context.appendText(model, 'Available actions:');

					for (var i = 0, len = location.actions.length; i < len; i++) {
						context.appendText(model, location.actions[i].command);
					}
				}
				else {
					context.appendText(model, 'No available actions in this location');
				}

				// If there are any global actions, display them separately
				if(model.gameData.commands.length > 0) {
					context.appendText(model, '\nGlobal actions:');

					for (var j = 0, ln = model.gameData.commands.length; j < ln; j++) {
						var globalCommand = model.gameData.commands[j];

						if(globalCommand.argument) {
							context.appendText(model, globalCommand.command + ' ' + globalCommand.argument);
						}
						else {
							context.appendText(model, globalCommand.command);
						}
					}
				}
			},

			/**
			 * Helper method that executes a player action
			 * @param {object} model - Game controller data model
			 */
			takeAction : function(model) {
				// Find the location by id
				var location = model.gameData.locations[model.currentLocation];
				// Set the default prompt
				var prompt = 'No available action.';
				// Validate current location's actions
				if(angular.isObject(location) && angular.isArray(location.actions) && location.actions.length > 0) {
					// Find the matching action in the current location's actions collection (if any)
					for (var i = 0, len = location.actions.length; i < len; i++) {
						if(location.actions[i].command === model.userInput.toLowerCase()) {
							// If it is a prompt, display it
							if(location.actions[i].prompt) {
								prompt = location.actions[i].prompt;
								break;
							}
							// If it is a location, then move the player
							else if(location.actions[i].nextLocation) {
								if(!context.moveToLocation(model, location.actions[i].nextLocation)) {
									context.appendText(model, 'LOCATION NOT FOUND!');
								}
								return;
							}
						}
					}

					// Action not found. See if it is a global action
					if(prompt === 'No available action.') {
						// Split the words first
						var userCommand = model.userInput.split(' ');

						// Loop through global commands
						for (var j = 0, ln = model.gameData.commands.length; j < ln; j++) {
							var globalCommand = model.gameData.commands[j];
							// TODO: Supports one word commands now. Improve parsing for multiple word commands later
							// If the first user word matches a global command
							if(globalCommand.command === userCommand[0].toLowerCase()) {
								// TODO: Only commands with arguments supported right now
								if(globalCommand.argument) {
									// Remove the first command from user input. The rest is arguments
									userCommand.shift();

									// Join the remaining words back again
									var argument = userCommand.join(' ');

									// Replace the substitute token with the argument
									prompt = globalCommand.prompt.replace(globalCommand.argument, argument);

									break;
								}
							}
						}
					}
				}

				// Display the prompt
				context.appendText(model, prompt);
			},

			/**
			 * Helper method that appends the user command to the console and calls relevant execute method
			 * @param {object} model - Game controller data model
			 */
			executeCommand : function(model) {
				context.appendText(model, '> ' + model.userInput);

				// If the user is requesting available actions list
				if(model.userInput === '/?') {
					context.listActions(model);
				}
				// otherwise take action
				else {
					context.takeAction(model);
				}

				// Clear user input from textbox
				model.userInput = '';
			}
		};

		return context;
	}]);
