/*!
 * get-spdx-license-ids | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/get-spdx-license-ids
*/
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
    var results = response.body.licenses.filter(hasValidSpdxLicenseId);
    if (omitDeprecated) {
      results = results.filter(isNotDeprecated);
    }
    return results.map(getLicenseId);
  };
}

module.exports = function getSpdxLicenseIds(options) {
  if (options && options.json === false) {
    return Promise.reject(new Error(
      'Cannot disable `json` option ' +
      'because get-spdx-license-ids always gets the SPDX license IDs as JSON.'
    ));
  }

  return fettuccine('licenses/licenses.json', Object.assign({
    baseUrl: 'https://spdx.org/'
  }, options, {
    json: true
  }))
  .then(extractSpdxLicenseIds(options && options.omitDeprecated));
};
