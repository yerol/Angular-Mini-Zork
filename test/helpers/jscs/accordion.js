/* global console */
(function () {

	'use strict';

	/**
	 * @description Make sure the browser supports what we are about to do.
	 * @returns {boolean}
	 */
	function hasFeatureSupport() {
		return !!(document.querySelectorAll && document.body.classList);
	}

	/**
	 * @description Finds correct error list element.
	 * @param {object.<HTMLElement>} targetElement
	 * @returns {object.<HTMLElement>} Error list element
	 */
	function getParentElement(targetElement) {
		var parentElem;

		if (targetElement.classList.contains('error')) {
			parentElem = targetElement;
		} else {
			parentElem = getParentElement(targetElement.parentElement);
		}

		return parentElem;
	}

	/**
	 * @description Gets error container element.
	 * @param {object.<HTMLElement>} eventTarget Event target element
	 * @returns {object.<HTMLElement>} Error container element
	 */
	function getErrorContainer(eventTarget) {
		var parentElement = getParentElement(eventTarget);

		if (parentElement) {
			return parentElement.querySelector('.errorMessage');
		}
	}

	/**
	 * @description Toggles error container visibility.
	 * @param {object.<HTMLElement>} eventTarget
	 */
	function toggleView(eventTarget) {
		var errorMessageContainer;

		errorMessageContainer = getErrorContainer(eventTarget);

		if (errorMessageContainer) {
			errorMessageContainer.classList.toggle('hide');
		}
	}

	/**
	 * @description Adds event listener to errors container element.
	 */
	function attachListener(errorsContainer) {
		errorsContainer.addEventListener('click', function (event) {
			event.stopPropagation();

			if (event.target.localName !== 'a') {
				toggleView(event.target);
			}
		}, false);
	}

	/**
	 * @description Initialises and checks for browser's feature support.
	 */
	function initialise() {
		var errorsContainer;

		if (hasFeatureSupport) {
			errorsContainer = document.querySelector('.errors');
			if (errorsContainer) {
				attachListener(errorsContainer);
			}
		} else {
			console.log('Please use a modern browser to view this page!');
		}
	}

	initialise();
}());
