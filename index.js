'use strict';

const Fettucine = require('fettuccine-class');
const inspectWithKind = require('inspect-with-kind');

function isValidId({licenseId}) {
	return !licenseId.endsWith('+');
}

function isDeprecatedAndValidId({isDeprecatedLicenseId, licenseId}) {
	return isDeprecatedLicenseId && !licenseId.endsWith('+');
}

function isNonDeprecatedAndValidId({isDeprecatedLicenseId, licenseId}) {
	return !isDeprecatedLicenseId && !licenseId.endsWith('+');
}

function getLicenseId({licenseId}) {
	return licenseId;
}

const fettuccine = new Fettucine({
	baseUrl: 'https://spdx.org',
	json: true
});

async function getSpdxLicenseData(...args) {
	const argLen = args.length;

	if (argLen !== 0 && argLen !== 1) {
		throw new RangeError(`Expected 0 or 1 arguments (options: <Object>), but got ${argLen} arguments.`);
	}

	const [options] = args;

	if (argLen === 1) {
		if (options !== null && typeof options === 'object') {
			if (options.json === false) {
				throw new Error('Cannot disable `json` option because get-spdx-license-ids always gets the SPDX license IDs as JSON.');
			}
		} else {
			throw new TypeError(`Expected an object to set the options of get-spdx-license-ids, but got ${
				inspectWithKind(options)
			} instead.`);
		}
	}

	return (await fettuccine.get('licenses/licenses.json', ...args)).body.licenses;
}

module.exports = async function getSpdxLicenseIds(...args) {
	return (await getSpdxLicenseData(...args)).filter(isNonDeprecatedAndValidId).map(getLicenseId);
};

module.exports.all = async function getAllSpdxLicenseIds(...args) {
	return (await getSpdxLicenseData(...args)).filter(isValidId).map(getLicenseId);
};

module.exports.both = async function getBothSpdxLicenseIds(...args) {
	const deprecated = [];
	const valid = [];

	for (const {licenseId, isDeprecatedLicenseId} of await getSpdxLicenseData(...args)) {
		if (licenseId.endsWith('+')) {
			continue;
		}

		if (isDeprecatedLicenseId) {
			deprecated.push(licenseId);
			continue;
		}

		valid.push(licenseId);
	}

	return [valid, deprecated];
};

module.exports.deprecated = async function getDeprecatedSpdxLicenseIds(...args) {
	return (await getSpdxLicenseData(...args)).filter(isDeprecatedAndValidId).map(getLicenseId);
};
