// Creating the Game module and Main controller for the Game module
angular.module('Modules.Game', [])
	.controller('Modules.Game.Controller',
		['Modules.Game.Service', 'Modules.Game.Factory',
		 function (gameService, gameFactory) {

		'use strict';

		// Private context object
		var my = {
			/**
			 * Success handler for the game data GET call
			 * @param {object} response - XHR response object
			 */
			handleResponse : function(response) {
				if(response.status === 200) {
					// Cache the game data
					this.model.gameData = response.data;

					// Validate game data
					if (gameFactory.validateGameData(this.model)) {
						this.model.gameDataValidated = true;

						// Move the player to the starting location
						gameFactory.moveToLocation(this.model, this.model.currentLocation);
					}
					else {
						gameFactory.appendText(this.model, "ERROR VALIDATING GAME DATA!!");
					}
				}
			},

			/**
			 * Error handler for the game data GET call
			 */
			handleErrorResponse : function() {
				gameFactory.appendText(this.model, "ERROR DOWNLOADING GAME DATA!!");
			}
		};

		 /**
		 * Game controller data model
		 */
		this.model = {
			userInput : '',
			consoleText : 'Angular Mini ZORK\n' +
						  'Copyright (c) 2015 Yigit Erol. All rights reserved.\n' +
						  'ZORK is a registered trademark of Infocom Inc.\n' +
						  'Revision 1.\n' +
						  '\n' +
						  'Enter /? for available actions' +
						  '\n' +
						  'Let\'s Begin..\n',
			currentLocation : 0,
			gameData : null,
			gameDataValidated : false
		};

		/**
		 * Method that handles player keyboard input
		 * @param {object} $event - Keyboard event object
		 */
		this.executeInput = function($event) {
			if(this.model.gameDataValidated) {
				// Execute command on enter
				if ($event.keyCode === 13 && this.model.userInput.length > 0) {
					gameFactory.executeCommand(this.model);
					$event.preventDefault();
				}
				// Prevent tabbing away
				else if ($event.keyCode === 9) {
					$event.preventDefault();
				}
				// Prevent browser history back on backspace when input is empty
				// TODO: The input loses focus at this point somehow. Figure out why.
				else if ($event.keyCode === 8 && this.model.userInput.length === 0) {
					$event.preventDefault();
				}
			}
		};

		/**
		 * Initialize method for the controller. This fetches the game data required for the game play
		 */
		this.initialize = function() {
			gameService.fetchData().then(my.handleResponse.bind(this), my.handleErrorResponse.bind(this));
		};

		/*
		 * Destroy handler for the controller
		 */
		this.onDestroy = function () {
			this.model = {};
		};
	}]);
