const testSuite = require('ava');
const keyvTestSuite = require('@keyv/test-suite').default;
const Keyv = require('keyv');
const { KeyvLruManagedTtl } = require('./lib');

const store = () => new KeyvLruManagedTtl(1000);
keyvTestSuite(testSuite, Keyv, store);
