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
const options = {
  max: 1000,
  notify: false,
  ttl: 0,
  expire: 0,
};
const keyvLru = new KeyvLru(options);
```

See [`tiny-lru`](https://www.npmjs.com/package/tiny-lru) to learn about the
available options. 
