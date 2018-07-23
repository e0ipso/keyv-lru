## Installation
In order to use LRU as your store in Keyv you will need to:

### Install
Install this module in your project:

```
yarn add keyv-lru
```
 
## Features
This module is based on the [`tiny-lru`](https://www.npmjs.com/package/tiny-lru)
module. This is one of the [best performing libraries for LRU storages](https://github.com/dominictarr/bench-lru#results). 

## Usage
Create your Keyv object by executing:

```js
const { KeyvLru, KeyvLruManagedTtl } = require('keyv-lru');

const options = {
  max: 1000,
  notify: false,
  ttl: 0,
  expire: 0,
};
const keyvLru = new KeyvLru(options);
const keyvLruManagedTtl = new KeyvLruManagedTtl(options);
```

See [`tiny-lru`](https://www.npmjs.com/package/tiny-lru) to learn about the
available options. 

## Managed TTLs
KeyvLruManagedTtl uses a managed TTL strategy instead of timers. This is useful
for serverless architectures. tiny-lru expires entries based on timers, that
means that the event loop is not empty when the lambda function is finished.
That blocks the end of the execution.

This implementation will store the expiration time along with the cached data
and it will deleter expired items upon retrieval. Alternatively there is an
`evictExpired()` method that will evict all the expired items.

Even when not using `tiny-lru`'s built-in expiration system based on timers, we
still benefit a lot from the LRU store.
