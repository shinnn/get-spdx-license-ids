/*!
 * get-spdx-license-ids | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/get-spdx-license-ids
*/
'use strict';

const fettuccine = require('fettuccine');

function hasValidSpdxLicenseId(license) {
  return !license.licenseId.endsWith('+');
}

function getLicenseId(license) {
  return license.licenseId;
}

function extractSpdxLicenseIds(response) {
  return response.body.licenses.filter(hasValidSpdxLicenseId).map(getLicenseId);
}

module.exports = function getSpdxLicenseIds(options) {
  options = options || {};

  if (options.json === false) {
    return Promise.reject(new Error(
      'Cannot disable `json` option ' +
      'because it get-spdx-license-ids always gets the SPDX license IDs as JSON.'
    ));
  }

  return fettuccine('licenses/licenses.json', Object.assign({
    baseUrl: 'https://spdx.org/'
  }, options, {
    json: true
  }))
  .then(extractSpdxLicenseIds);
};
