'use strict';
/**
 * Parses an object such as:
 *
 * {
 *   hostname: 'dev.rabbitmq.com',
 *   port: 5672,
 *   vhost: 'seneca',
 *   username: 'guest',
 *   password: 'guest',
 *   frameMax: 1024
 * }
 *
 * and builds an AMQP URI like:
 *
 * `amqp://guest:guest@dev.rabbitmq.com:5672/seneca?frameMax=1024`
 *
 * @module amqpuri
 */
const pick = require('lodash.pick');
const compose = require('lodash.flowright');
const curry = require('lodash.curry');
const url = require('url');

/**
 * Name of the AMQP protocol used during URI creation.
 * @type {String}
 */
const DEFAULT_PROTOCOL = 'amqp';

/**
 * URI parameters accepted by the AMQP RabbitMQ spec.
 * See https://www.rabbitmq.com/uri-spec.html
 *
 * @type {Array}
 */
const DEFAULT_PARAMETERS = ['frameMax', 'channelMax', 'heartbeat', 'locale'];

// Module API
module.exports = {
  format
};

/**
 * Fetches last element of an array.
 * @param  {Array} arr An array.
 * @return {*}     The last element of the array.
 */
const last = (arr) => arr[arr.length - 1];

/**
 * Determines if an object has, at least, one attribute.
 * @param  {Object} obj Any object.
 * @return {Boolean}    true if `obj` has, at least, one property;
 *                           false, otherwise.
 */
const isObjectNotEmpty = (obj) => obj && Object.keys(obj).length;

/**
 * Adds query parameters provided by `query` to the `uri` object.
 * @param  {Object} A map of URI query parameters.
 * @param  {Object} uri   An URI object descriptor.
 * @return {Object} The URI object with the new query parameters.
 */
const query = curry((query, uri) => {
  const queryWithDefaultParameters = Object.assign({},
    uri.query,
    pick(query, DEFAULT_PARAMETERS)
  );
  return isObjectNotEmpty(queryWithDefaultParameters) ?
    Object.assign({}, uri, { query: queryWithDefaultParameters }) :
    uri;
});

/**
 * Prefixes an `amqp://` protocol if none was specified in `uri`. If one is
 * present, this function does nothing and returns `uri` as is.
 * @param  {String} uri An AMQP URI string.
 * @return {String}     The URI string with a prepended protocol.
 */
const protocol = (uri) => {
  const parts = uri.split('://');
  return uri.startsWith(DEFAULT_PROTOCOL) ?
    uri :
    [DEFAULT_PROTOCOL, last(parts)].join('://');
};

/**
 * Adds an `auth` property to the `uri` descriptor object containing
 * `auth.username` and `auth.password` separated by a semicolon (':').
 * @param  {Object} An object with `password` and `username` properties.
 * @param  {Object} uri   An URI object descriptor.
 * @return {Object} The URI object with the new auth attribute.
 */
const auth = curry(({ username, password }, uri) => {
  return (!uri.auth && username && password) ?
    Object.assign({}, uri, { auth: [username, password].join(':') }) :
    uri;
});

/**
 * Adds a `port` property to the `uri` descriptor object if it doesn't contain
 * one already.
 * @param  {Object} An object with a numeric `port`.
 * @param  {Object} uri   An URI object descriptor.
 * @return {Object} The URI object with the new port attribute.
 */
const port = curry(({ port }, uri) => {
  return (!uri.port && port) ?
    Object.assign({}, uri, { port }) :
    uri;
});

/**
 * Adds a `pathname` property to the `uri` descriptor object, if it doesn't
 * contain one already.
 * @param  {Object} An object with `vhost` or `path` properties.
 * @param  {Object} uri   An URI object descriptor.
 * @return {Object} The URI object with the new pathname attribute.
 */
const vhost = curry(({ vhost, path }, uri) => {
  const pathname = vhost || path;
  return (!uri.pathname && vhost) ?
    Object.assign({}, uri, { pathname }) :
    uri;
});

/**
 * Removes the `host` attribute of `uri` if `opts.host` is not defined. Otherwise,
 * returns the `uri` as is.
 * @param  {Object} An object with a `host` = property.
 * @param  {Object} uri   An URI object descriptor.
 * @return {Object} The URI object with host removed (or unmodified).
 */
const removeHost = curry(({ host }, uri) => {
  return host === undefined ? Object.assign({}, uri, { host }) : uri;
});

/**
 * Composes a set of functions to build a single URI formatter function
 * that receives an URI string and returns its normalised version.
 * @param  {Object} opts Options used in URI building.
 * @return {Function}      An URi formatter function.
 */
const createUriFormatter = (opts) => compose(
    url.format,
    vhost(opts),
    port(opts),
    query(opts),
    auth(opts),
    removeHost(opts),
    url.parse,
    protocol
  );

/**
 * Creates and returns a URI string from a descriptor object with options.
 * For a set of available options see: https://nodejs.org/api/url.html
 * Additionally, 'frameMax', 'channelMax', 'heartbeat' and 'locale' may be used
 * as options.
 *
 * @param  {Object} opts Options for URI building.
 * @return {String}     The formatted string URI.
 */
function format(opts = {}) {
  const uri = opts.hostname || opts.host || opts.url || opts.href || '';
  const formatUri = uri && createUriFormatter(opts);
  return formatUri ? formatUri(uri) : uri;
}
