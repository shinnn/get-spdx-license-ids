'use strict';

const Fettucine = require('fettuccine-class');
const inspectWithKind = require('inspect-with-kind');

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

const fettuccine = new Fettucine({
	baseUrl: 'https://spdx.org',
	json: true
});

module.exports = function getSpdxLicenseIds(...args) {
	const argLen = args.length;

	if (argLen !== 0 && argLen !== 1) {
		throw new RangeError(`Expected 0 or 1 arguments (options: <Object>), but got ${argLen} arguments.`);
	}

	const [options] = args;

	if (argLen === 1) {
		if (options !== null && typeof options === 'object') {
			if (options.json === false) {
				return Promise.reject(new Error('Cannot disable `json` option because get-spdx-license-ids always gets the SPDX license IDs as JSON.'));
			}
		} else {
			throw new TypeError(`Expected an object to set the options of get-spdx-license-ids, but got ${
				inspectWithKind(options)
			} instead.`);
		}
	}

	return fettuccine.get('licenses/licenses.json', ...args)
	.then(extractSpdxLicenseIds(options && options.omitDeprecated));
};
