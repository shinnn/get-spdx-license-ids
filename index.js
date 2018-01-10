'use strict';

const fettuccine = require('fettuccine');

function hasValidSpdxLicenseId(license) {
	return !license.licenseId.endsWith('+');
}

function isNotDeprecated(license) {
	return !license.isDeprecatedLicenseId;
}

function getLicenseId(license) {
	return license.licenseId;
}

function extractSpdxLicenseIds(omitDeprecated) {
	return function(response) {
		let results = response.body.licenses.filter(hasValidSpdxLicenseId);
		if (omitDeprecated) {
			results = results.filter(isNotDeprecated);
		}
		return results.map(getLicenseId);
	};
}

module.exports = function getSpdxLicenseIds(...args) {
	const argLen = args.length;

	if (argLen === 0) {
		return fettuccine('https://spdx.org/licenses/licenses.json', {
			json: true
		}).then(extractSpdxLicenseIds(false));
	} else if (argLen !== 1) {
		throw new RangeError(`Expected 0 or 1 arguments (options: <Object>), but got ${argLen} arguments.`);
	}

	const [options] = args;

	if (options && typeof options === 'object') {
		if (options.json === false) {
			return Promise.reject(new Error('Cannot disable `json` option because get-spdx-license-ids always gets the SPDX license IDs as JSON.'));
		}
	}

	return fettuccine('licenses/licenses.json', Object.assign({
		baseUrl: 'https://spdx.org/'
	}, options, {
		json: true
	}))
	.then(extractSpdxLicenseIds(options && options.omitDeprecated));
};
