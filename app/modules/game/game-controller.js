// Main controller for the Game module
angular.module('Modules.Game', [])
	.controller('Modules.Game.Controller',
		['Modules.Game.Service', 'Modules.Game.Factory',
		 function (gameService, gameFactory) {
		'use strict';

		var my = {
			handleResponse : function(response) {
				if(response.status === 200) {
					this.model.gameData = response.data;

					if (gameFactory.validateGameData(this.model)) {
						this.model.gameDataValidated = true;

						gameFactory.moveToLocation(this.model, this.model.currentLocation);
					}
					else {
						gameFactory.appendText(this.model, "ERROR VALIDATING GAME DATA!!");
					}
				}
			},

			handleErrorResponse : function() {
				gameFactory.appendText(this.model, "ERROR DOWNLOADING GAME DATA!!");
			}
		};

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

		this.executeInput = function($event) {
			if(this.model.gameDataValidated) {
				// Execute on enter
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

		this.initialize = function() {
			gameService.fetchData().then(my.handleResponse.bind(this), my.handleErrorResponse.bind(this));
		};

		/*
		 * Destroy handler for the controller
		 */
		this.onDestroy = function () {
		};
	}]);
