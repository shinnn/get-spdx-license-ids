# get-spdx-license-ids

[![npm version](https://img.shields.io/npm/v/get-spdx-license-ids.svg)](https://www.npmjs.com/package/get-spdx-license-ids)
[![Build Status](https://travis-ci.org/shinnn/get-spdx-license-ids.svg?branch=master)](https://travis-ci.org/shinnn/get-spdx-license-ids)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/get-spdx-license-ids.svg)](https://coveralls.io/github/shinnn/is-gist-starred?branch=master)

A [Node.js](https://nodejs.org/) module to get an array of the latest [SPDX license](https://spdx.org/licenses/) identifiers from [spdx.org](https://spdx.org/)

```javascript
const getSpdxLicenseIds = require('get-spdx-license-ids');

(async () => {
  const ids = await getSpdxLicenseIds();
  //=> ['0BSD', 'AAL', 'Abstyles', 'Adobe-2006', 'Adobe-Glyph', 'ADSL', 'AFL-1.1', 'AFL-1.2', ...]
})();
```

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/getting-started/what-is-npm).

```
npm install get-spdx-license-ids
```

## API

```javascript
const getSpdxLicenseIds = require('get-spdx-license-ids');
```

### getSpdxLicenseIds([*options*])

*options*: `Object` ([`request` options](https://github.com/request/request#requestoptions-callback) without `json` option that defaults to `true`)  
Return: `Promise<Array<string>>`

It retrieves an array of non-deprecated SPDX license identifiers from <https://spdx.org/licenses/licenses.json>.

```javascript
(async () => {
  const ids = await getSpdxLicenseIds();
  ids.includes('MIT'); //=> true
  ids.includes('ISC'); //=> true

  ids.includes('GPL-1.0'); //=> false
})
```

### getSpdxLicenseIds.deprecated([*options*])

Retrieves deprecated IDs only.

```javascript
(async () => {
  const deprecatedIds = await getSpdxLicenseIds.deprecated();
  deprecatedIds.includes('MIT'); //=> false
  deprecatedIds.includes('ISC'); //=> false

  deprecatedIds.includes('GPL-1.0'); //=> true
})();
```

### getSpdxLicenseIds.all([*options*])

Retrieves both deprecated and non-deprecated IDs in a single array.

```javascript
(async () => {
  const allIds = await getSpdxLicenseIds.all();
  allIds.includes('MIT'); //=> true
  allIds.includes('ISC'); //=> true
  allIds.includes('GPL-1.0'); //=> false
})();
```

### getSpdxLicenseIds.both([*options*])

Retrieves both deprecated and non-deprecated IDs in two separate arrays.

```javascript
(async () => {
  const pair = await getSpdxLicenseIds.both();
  pair.length; //=> 2

  const [valid, deprecated] = pair;

  valid.includes('MIT'); //=> true
  valid.includes('ISC'); //=> true

  valid.includes('GPL-1.0'); //=> false

  deprecated.includes('MIT'); //=> false
  deprecated.includes('ISC'); //=> false

  deprecated.includes('GPL-1.0'); //=> true
})();
```

## License

[ISC License](./LICENSE) © 2018 Shinnosuke Watanabe
