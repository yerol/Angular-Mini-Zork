// Main controller for the Game module
angular.module('Modules.Game', [])
	.controller('Modules.Game.Controller', [function () {
		'use strict';

		this.model = {
			userInput : '',
			consoleText : 'Angular Mini ZORK\n' +
						  'Copyright (c) 2015 Yigit Erol. All rights reserved.\n' +
						  'ZORK is a registered trademark of Infocom Inc.\n' +
						  'Revision 1.\n' +
						  '\n' +
						  'Supported Commands:\n' +
						  'look at room\n' +
						  'look at me\n' +
						  'say [message]\n' +
						  '\n' +
						  'Begin..'
		};

		this.executeCommand = function() {
			this.model.consoleText += '\n>' + this.model.userInput;
			this.model.userInput = '';
		};

		this.executeInput = function($event) {
			// Execute on enter
			if ($event.keyCode === 13 && this.model.userInput.length > 0) {
				this.executeCommand(this.model.userInput);
				$event.preventDefault();
			}
			// Prevent tabbing away
			else if ($event.keyCode === 9) {
				$event.preventDefault();
			}
			// Prevent browser history back on backspace when input is empty
			// TODO: The input loses focus at this point somehow. Figure out why.
			else if($event.keyCode === 8 && this.model.userInput.length === 0) {
				$event.preventDefault();
			}
		};

		/*
		 * Destroy handler for the controller
		 */
		this.onDestroy = function () {
		};
	}]);
