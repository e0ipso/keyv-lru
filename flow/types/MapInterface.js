// @flow

export interface MapInterface {
  clear(): void;
  delete(key: string): boolean;
  get(key: string): any;
  set(key: string, value: any, ttl: number): 1 | 0;
}
