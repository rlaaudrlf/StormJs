import { isFunction } from 'util';

export class Factory {
  createProxy(target) {
    const proxy = this.createExceptionProxy();

    return new Proxy(target, {
      get: proxy,
      set: proxy,
    });
  }

  createExceptionProxy() {
    return (receiver, prop) => {
      if (!(prop in receiver)) {
        return;
      }

      if (isFunction(receiver[prop])) {
        return this.createExceptionZone(receiver, prop);
      }

      return receiver[prop];
    };
  }

  createExceptionZone(receiver, prop) {
    return (...args) => {
      let result;

      Factory.run(() => {
        result = receiver[prop](...args);
      });

      return result;
    };
  }

  static run(fn) {
    try {
      fn();
    } catch (e) {}
  }

  static async asyncRun(fn) {
    try {
      await fn();
    } catch (e) {}
  }
}
