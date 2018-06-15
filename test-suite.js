const testSuite = require('ava');
const keyvTestSuite = require('@keyv/test-suite').default;
const Keyv = require('keyv');
const KeyvStore = require('./lib');

console.log(keyvTestSuite);
const store = () => new KeyvStore(1000);
keyvTestSuite(testSuite, Keyv, store);
