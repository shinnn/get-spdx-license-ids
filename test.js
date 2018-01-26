'use strict';

const getSpdxLicenseIds = require('.');
const test = require('tape');

test('getSpdxLicenseIds()', async t => {
	t.plan(12);

	process.env.HTTPS_PROXY = 'https://example.org';

	try {
		await getSpdxLicenseIds({});
	} catch ({message}) {
		t.ok(
			message.includes('tunneling socket could not be established'),
			'should support proxy environment variables.'
		);
	}

	delete process.env.HTTPS_PROXY;

	const [valid, deprecated] = await getSpdxLicenseIds.both();

	t.ok(
		valid.includes('W3C') && deprecated.includes('GPL-1.0'),
		'should get two arrays of valid/deprecated IDs by `both` method.'
	);

	(async () => {
		const ids = await getSpdxLicenseIds();

		t.equal(
			Array.isArray(ids),
			true,
			'should get an array.'
		);

		t.deepEqual(
			ids,
			valid,
			'should get SPDX license IDs.'
		);

		t.notOk(
			ids.includes('GPL-1.0+'),
			'should get an array without any SPDX expressions.'
		);

		t.notOk(
			ids.includes('wXwindows'),
			'should exclude deprecated IDs from the result.'
		);
	})();

	(async () => {
		const ids = await getSpdxLicenseIds.all();

		t.ok(
			ids.includes('Interbase-1.0') && ids.includes('Nunit'),
			'should get both deprecated and non-deprecated IDs by `all` method.'
		);
	})();

	(async () => {
		t.deepEqual(
			await getSpdxLicenseIds.deprecated(),
			deprecated,
			'should get only deprecated IDs by `deprecated` method.'
		);
	})();

	try {
		await getSpdxLicenseIds(null);
	} catch ({message}) {
		t.equal(
			message,
			'Expected an object to set the options of get-spdx-license-ids, but got null instead.',
			'should fail when it takes a non-object argument.'
		);
	}

	try {
		await getSpdxLicenseIds(Number);
	} catch ({message}) {
		t.equal(
			message,
			'Expected an object to set the options of get-spdx-license-ids, but got [Function: Number] instead.',
			'should fail when it takes an falsy argument.'
		);
	}

	try {
		await getSpdxLicenseIds({json: false});
	} catch ({message}) {
		t.equal(
			message,
			'Cannot disable `json` option because get-spdx-license-ids always gets the SPDX license IDs as JSON.',
			'should fail when `json` option is disabled.'
		);
	}

	try {
		await getSpdxLicenseIds({}, {});
	} catch ({message}) {
		t.equal(
			message,
			'Expected 0 or 1 arguments (options: <Object>), but got 2 arguments.',
			'should fail when it takes too many arguments.'
		);
	}
});
