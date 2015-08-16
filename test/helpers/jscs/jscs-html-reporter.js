/* global console */

/**
 * @param {Array} errorsCollection
 */
module.exports = function (errorsCollection) {

	'use strict';

	var errorCount = 0,
		header = '',
		errorsHtml = '',
		footer = '';

	/**
	 * @description Generates HTML report of style errors.
	 */
	function generateReport() {
		createHeaderPartial();
		generateErrorsList();
		createFooterPartial();
		combineAndOutputAllPartials();
	}

	/**
	 * @description Creates header part of HTML page.
	 */
	function createHeaderPartial() {
		header += [
			'<!DOCTYPE html><html lang="en">',
			'<head><meta charset="UTF-8"><title>JSCS style errors</title>',
			'<link href="../../helpers/jscs/jscs-html-reporter.css" rel="stylesheet">',
			'</head>',
			'<body>'
		].join('');
	}

	/**
	 * @description Outputs errors in every error set.
	 */
	function generateErrorsList() {
		errorsHtml += '<ul class="errors">';

		errorsCollection.forEach(function (errors) {
			if (!errors.isEmpty()) {
				errors.getErrorList().forEach(function (error) {
					errorCount++;
					createListElement(error, errors, errorCount);
				});
			}
		});

		header += (errorCount ? '<h1 class="error">Total number of errors: ' + errorCount : '<h1>No errors found!') + '</h1>';
		errorsHtml += '</ul>';
	}

	/**
	 * @description Creates li element with error information.
	 * @param {object} error Current error object
	 * @param {Array} errors A list of errors
	 * @param {Number} errorCount Error number
	 */
	function createListElement(error, errors, errorCount) {
		errorsHtml += [
			'<li class="error">',
			'<span class="errorHeader">',
			'<span class="errorNumber">' + errorCount + '.</span>',
			error.message + ' - ',
			'<span class="file">',
			'<a href="../../../' + errors.getFilename() + '" target="_blank">' + errors.getFilename() + '</a>',
			' (' + error.line + ', ' + (error.column + 1) + ')',
			'</span>',
			'</span>',
			'<div class="errorMessage hide">' + encodeHtml(errors.explainError(error)) + '</div></li>'
		].join('');
	}

	/**
	 * @description Encodes HTML characters in strings.
	 * @param {string} string
	 * @returns {string} Encoded string
	 */
	function encodeHtml(string) {
		var entitiesMap = {
			'&': '&amp;',
			'"': '&quot;',
			'<': '&lt;',
			'>': '&gt;'
		};

		return (string || '').replace(/(&|"|<|>)/g, function (entity) {
			return entitiesMap[entity];
		});
	}

	/**
	 * @description Creates footer part of HTML page.
	 */
	function createFooterPartial() {
		footer += [
			'<script type="text/javascript" src="../../helpers/jscs/accordion.js"></script>',
			'</body>',
			'</html>'
		].join('');
	}

	/**
	 * @description Combines all HTML partials into one and outputs to console.
	 */
	function combineAndOutputAllPartials() {
		console.log(
			[
				header,
				errorsHtml,
				footer
			].join('')
		);
	}

	generateReport();
};
