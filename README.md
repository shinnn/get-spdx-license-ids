# get-spdx-license-ids

[![NPM version](https://img.shields.io/npm/v/get-spdx-license-ids.svg)](https://www.npmjs.com/package/get-spdx-license-ids)
[![Build Status](https://travis-ci.org/shinnn/get-spdx-license-ids.svg?branch=master)](https://travis-ci.org/shinnn/get-spdx-license-ids)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/get-spdx-license-ids.svg)](https://coveralls.io/github/shinnn/is-gist-starred?branch=master)
[![Dependency Status](https://david-dm.org/shinnn/get-spdx-license-ids.svg)](https://david-dm.org/shinnn/get-spdx-license-ids)
[![devDependency Status](https://david-dm.org/shinnn/get-spdx-license-ids/dev-status.svg)](https://david-dm.org/shinnn/get-spdx-license-ids#info=devDependencies)

A [Node](https://nodejs.org/) module to get an array of the latest [SPDX license](https://spdx.org/licenses/) identifiers from [spdx.org](https://spdx.org/)

```javascript
const getSpdxLicenseIds = require('get-spdx-license-ids');

getSpdxLicenseIds().then(ids => {
  ids; //=> ['Glide', 'Abstyles', 'AFL-1.1', 'AFL-1.2', 'AFL-2.0', 'AFL-2.1', ...]
});
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install get-spdx-license-ids
```

## API

```javascript
const getSpdxLicenseIds = require('get-spdx-license-ids');
```

### getSpdxLicenseIds([*options*])

*options*: `Object` ([`request` options](https://github.com/request/request#requestoptions-callback) without `json` option that defaults to `true`)  
Return: [`Promise`](http://www.ecma-international.org/ecma-262/6.0/#sec-promise-constructor) instance

It gets an array of valid SPDX license identifiers from <https://spdx.org/licenses/licenses.json> and returns a promise.

```javascript
const getSpdxLicenseIds = require('get-spdx-license-ids');

getSpdxLicenseIds().then(ids => {
  ids.includes('MIT'); //=> true
  ids.includes('zlib-acknowledgement'); //=> true

  ids.includes('foo-bar-baz'); //=> false
});
```

## License

Copyright (c) 2016 - 2017 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
