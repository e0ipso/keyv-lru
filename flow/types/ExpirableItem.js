// @flow

export type ExpirableItem<T> = {
  // Timestamp in millis (like Date.now()) when this item is no longer usable.
  expires?: number,
  data: T,
};
