'use strict';

const getSpdxLicenseIds = require('.');
const test = require('tape');

test('getSpdxLicenseIds()', async t => {
	t.plan(7);

	process.env.HTTPS_PROXY = 'https://example.org';

	try {
		await getSpdxLicenseIds();
	} catch ({message}) {
		t.ok(
			message.includes('tunneling socket could not be established'),
			'should support proxy environment variables.'
		);
	}

	delete process.env.HTTPS_PROXY;

	(async () => {
		const ids = await getSpdxLicenseIds(null);

		t.equal(
			Array.isArray(ids),
			true,
			'should get an array.'
		);

		t.ok(
			ids.includes('GPL-1.0'),
			'should get SPDX license IDs.'
		);

		t.notOk(
			ids.includes('GPL-1.0+'),
			'should get an array without any SPDX expressions.'
		);
	})();

	(async () => {
		const ids = await getSpdxLicenseIds({omitDeprecated: true});

		t.notOk(
			ids.includes('WXwindows'),
			'should get an array without any deprecated identifiers.'
		);
	})();

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
