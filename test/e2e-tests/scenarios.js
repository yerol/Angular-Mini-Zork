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
			expect(element.all(by.css('[ng-view] .game-container h1')).first().getText()).toMatch(/Angular Js Mini Zork Game/);
		});
	});
});
