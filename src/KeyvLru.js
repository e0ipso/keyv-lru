// @flow

import type { MapInterface } from '../flow/types/MapInterface';

const lru = require('tiny-lru');
const EventEmitter = require('events');

/**
 * An adaptor from tiny-lru to a Map API.
 */
class KeyvLru extends EventEmitter implements MapInterface {
  // @TODO: Type this in a less generic way.
  cache: Object;
  defaultTtl: ?number;

  constructor(
    options: {
      max: number,
      notify?: boolean,
      ttl?: number,
      expire?: number,
    } = { max: 500 }
  ) {
    super();
    this.defaultTtl = options.ttl;
    this.cache = lru(
      options.max,
      options.notify,
      this.defaultTtl,
      options.expire
    );
    if (options.notify) {
      // This seems like a weird construct, but this is because tiny-lru passes
      // the execution of this.cache.onchange to process.nextTick. nextTick
      // expects a function.
      this.cache.onchange = (event, serializedCache) => () => {
        this.emit('change', event, serializedCache);
      };
    }
  }

  clear(): void {
    this.cache.clear();
  }

  delete(key: string): boolean {
    const removed = this.cache.remove(key);
    return typeof removed !== 'undefined';
  }

  get(key: string): any {
    return this.cache.get(key);
  }

  set(key: string, value: any): 1 | 0 {
    this.cache.set(key, value);
    return 1;
  }
}

module.exports = KeyvLru;
