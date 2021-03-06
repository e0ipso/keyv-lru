const testSuite = require('ava');
const keyvTestSuite = require('@keyv/test-suite').default;
const Keyv = require('keyv');
const { KeyvLru } = require('./lib');

const store = () => new KeyvLru(1000);
keyvTestSuite(testSuite, Keyv, store);
