'use strict';

const getSpdxLicenseIds = require('.');
const test = require('tape');

test('getSpdxLicenseIds()', t => {
  t.plan(6);

  t.strictEqual(getSpdxLicenseIds.name, 'getSpdxLicenseIds', 'should have a function name.');

  getSpdxLicenseIds().then(ids => {
    t.strictEqual(
      Array.isArray(ids),
      true,
      'should be fulfilled with an array.'
    );
    t.strictEqual(
      ids.includes('GPL-1.0'),
      true,
      'should be fulfilled with an array of SPDX license IDs.'
    );
    t.strictEqual(
      ids.includes('GPL-1.0+'),
      false,
      'should be fulfilled with an array that doesn\'t include any SPDX expressions.'
    );
  }).catch(t.fail);

  getSpdxLicenseIds({omitDeprecated: true}).then(ids => {
    t.strictEqual(
      ids.includes('WXwindows'),
      false,
      'should be fulfilled with an array that doesn\'t include any deprecated identifiers.'
    );
  }).catch(t.fail);

  getSpdxLicenseIds({json: false}).then(t.fail, err => {
    t.strictEqual(
      err.message,
      'Cannot disable `json` option because get-spdx-license-ids always gets the SPDX license IDs as JSON.',
      'should fail when `json` option is disabled.'
    );
  }).catch(t.fail);
});
