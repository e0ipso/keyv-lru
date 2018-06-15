// @flow

import type { MapInterface } from '../flow/types/MapInterface';

const lru = require('tiny-lru');

/**
 * An adaptor from tiny-lru to a Map API.
 */
class KeyvLru implements MapInterface {
  // @TODO: Type this in a less generic way.
  cache: Object;

  constructor(
    options: {
      max: number,
      notify?: boolean,
      ttl?: number,
      expire?: number,
    } = { max: 500 }
  ) {
    this.cache = lru(options.max, options.notify, options.ttl, options.expire);
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
