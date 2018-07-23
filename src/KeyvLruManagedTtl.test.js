const KeyvLruManagedTtl = require('./KeyvLruManagedTtl');

describe('KeyvLruManagedTtl', () => {
  test('constructor', () => {
    expect.assertions(2);
    const sut = new KeyvLruManagedTtl();
    expect(sut.cache).not.toBeUndefined();
    expect(sut).toBeInstanceOf(KeyvLruManagedTtl);
  });
  describe('KeyvLruManagedTtl methods', () => {
    let sut;

    beforeEach(() => {
      sut = new KeyvLruManagedTtl({ max: 100 });
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test('get a missing item', () => {
      expect.assertions(1);
      jest.spyOn(sut.cache, 'get');
      sut.get('foo');
      expect(sut.cache.get).toHaveBeenCalledWith('foo');
    });

    test('get an item without ttl', () => {
      expect.assertions(1);
      sut.cache.set('foo');
      jest.spyOn(sut.cache, 'get').mockReturnValue({ data: { bar: true } });
      expect(sut.get('foo')).toEqual({ bar: true });
    });

    test('get an expired item', () => {
      expect.assertions(1);
      sut.cache.set('foo');
      jest
        .spyOn(sut.cache, 'get')
        .mockReturnValue({ expires: 0, data: { bar: true } });
      expect(sut.get('foo')).toBeUndefined();
    });

    test('get an unexpired item', () => {
      expect.assertions(1);
      sut.cache.set('foo');
      jest.spyOn(sut.cache, 'get').mockReturnValue({
        expires: Date.now() + 1000000000,
        data: { bar: true },
      });
      expect(sut.get('foo')).toEqual({ bar: true });
    });

    test('set without a ttl', () => {
      expect.assertions(2);
      jest.spyOn(sut.cache, 'set');
      sut.set('foo', { bar: true });
      expect(sut.cache.set).toHaveBeenCalledWith('foo', {
        data: { bar: true },
      });
      expect(sut.cache.get('foo')).toEqual({ data: { bar: true } });
    });

    test('set with a ttl', () => {
      expect.assertions(1);
      jest.spyOn(Date, 'now').mockReturnValue(123456789);
      jest.spyOn(sut.cache, 'set');
      sut.set('foo', { bar: true }, 1000000000);
      expect(sut.cache.set).toHaveBeenCalledWith('foo', {
        data: { bar: true },
        expires: 1123456789,
      });
    });

    test('evictExpired', done => {
      expect.assertions(3);
      jest.spyOn(sut, 'delete');
      sut.cache.set('foo', { data: 'bar', expires: Date.now() + 1000000000 });
      sut.cache.set('python', { data: 'cobra' });
      sut.cache.set('lorem', { data: 'ipsum', expires: 0 });
      sut.cache.set('dolor', { data: 'sid', expires: 0 });
      sut.evictExpired();
      process.nextTick(() => {
        expect(sut.delete).toHaveBeenCalledTimes(2);
        expect(sut.delete).toHaveBeenCalledWith('lorem');
        expect(sut.delete).toHaveBeenCalledWith('dolor');
        done();
      });
    });
  });
});
