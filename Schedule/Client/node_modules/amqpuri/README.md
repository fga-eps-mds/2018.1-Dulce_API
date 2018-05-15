# amqpuri

[![Greenkeeper badge](https://badges.greenkeeper.io/nfantone/amqp-uri.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/nfantone/amqp-uri.svg?branch=develop)](https://travis-ci.org/nfantone/amqp-uri) [![codecov.io](https://codecov.io/github/nfantone/amqp-uri/coverage.svg?branch=develop)](https://codecov.io/github/nfantone/amqp-uri?branch=develop) [![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard) [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/nfantone/amqp-uri/blob/master/LICENSE)

Create [AMQP URIs][3] as you would with [node's url][1]

## Install
```sh
npm i --save amqpuri
```

> This module does _not_ support `node < 6.0.0`. If you need to install this in older versions, consider using [amqp-uri][2]

## Usage
```js
const amqpuri = require('amqpuri');

let uri = amqpuri.format({
  hostname: 'dev.rabbitmq.com',
  port: 5672,
  vhost: 'seneca',
  username: 'guest',
  password: 'guest',
  frameMax: 1024,
  channelMax: 1000,
  heartbeat: 500,
  locale: 'en_US'
});

console.log(uri);
// amqp://guest:guest@dev.rabbitmq.com:5672/seneca?frameMax=1024&channelMax=1000&heartbeat=500&locale=en_US
```

## Test
To run tests, clone the repository, install dependencies and call the appropriate `npm` script.

```sh
git clone https://github.com/nfantone/amqp-uri.git amqpuri
cd amqpuri
npm i
npm test
```

## License
MIT

[1]: https://nodejs.org/api/url.html
[2]: https://www.npmjs.com/package/amqp-uri
[3]: https://www.rabbitmq.com/uri-spec.html
