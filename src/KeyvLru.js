// @flow

import type { MapInterface } from '../flow/types/MapInterface';

const lru = require('tiny-lru');

/**
 * An adaptor from tiny-lru to a Map API.
 */
class KeyvLru implements MapInterface {
  cache;

  constructor(
    max: number,
    options: {
      notify?: boolean,
      ttl?: number,
      expire?: number,
    } = {}
  ) {
    this.cache = lru(max, options.notify, options.ttl, options.expire);
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
