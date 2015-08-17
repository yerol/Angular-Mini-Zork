// End to end protractor tests for Zork Game

'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('Zork ', function () {

	it('should not automatically redirect to any sub-view when location hash/fragment is empty', function () {
		browser.get('index.html');
		expect(browser.getLocationAbsUrl()).toMatch('/');
	});

	describe('game view', function () {

		beforeEach(function () {
			browser.get('index.html');
		});

		it('should render game module when user navigates to /', function () {
			expect(element(by.css('.game-console-textbox')).getAttribute('value')).toMatch(/Angular Mini ZORK/);
		});
	});

	describe('when player enters a command', function () {

		beforeEach(function () {
			browser.get('index.html');

			var input = element(by.css('.game-input')).sendKeys('say hello').sendKeys(protractor.Key.ENTER);
		});

		it('should display the command in the console', function () {
			expect(element(by.css('.game-console-textbox')).getAttribute('value')).toMatch(/say hello/);
		});
	});
});
