// @flow

import type { ExpirableItem } from '../flow/types/ExpirableItem';

const lru = require('tiny-lru');
const KeyvLru = require('./KeyvLru');

/**
 * An adaptor from tiny-lru to a Map API.
 *
 * This version uses a managed TTL strategy instead of tiny-lru. This is useful
 * for serverless architectures. tiny-lru expires entries based on timers, that
 * means that the event loop is not empty when the lambda function is finished.
 * That blocks the end of the execution.
 *
 * This implementation will store the expiration time along with the cached data
 * and it will deleter expired items upon retrieval. Alternatively there is an
 * evictExpired method that will evict all the expired items.
 */
class KeyvLruManagedTtl<T> extends KeyvLru {
  cache: Object;
  defaultTtl: ?number;

  constructor(
    options: {
      max: number,
      notify?: boolean,
      ttl?: number,
    } = { max: 500 }
  ) {
    super();
    this.cache = lru(options.max, options.notify);
  }

  get(key: string): ?T {
    const item: ?ExpirableItem<T> = this.cache.get(key);
    if (!item) {
      return undefined;
    }
    if (typeof item.expires === 'undefined') {
      return item.data;
    }
    if (item.expires > Date.now()) {
      // It's not expired yet.
      return item.data;
    }
    // Schedule removal and return undefined.
    process.nextTick(() => this.delete(key));

    return undefined;
  }

  set(key: string, value: T, ttl?: number): 1 | 0 {
    const item: ExpirableItem<T> = { data: value };
    const theTtl = ttl || this.defaultTtl;
    if (typeof theTtl !== 'undefined') {
      item.expires = theTtl + Date.now();
    }
    this.cache.set(key, item);
    return 1;
  }

  /**
   * Loop through all the cache entries and get them.
   *
   * This has the effect to delete all the expired cache entries.
   *
   * @return {void}
   */
  evictExpired() {
    // Getting the entries will cause evition on expired entries.
    Object.keys(this.cache.cache).forEach(this.get.bind(this));
  }
}

module.exports = KeyvLruManagedTtl;
