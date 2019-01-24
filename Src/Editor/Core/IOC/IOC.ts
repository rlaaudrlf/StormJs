import { isFunction } from 'util';

type myWindow=Window&{ioc}
let selfWindow:myWindow=<myWindow><any>window

export class IOC {
  public static get Instance() {
    if (!selfWindow.ioc) {
      selfWindow.ioc = new IOC();
    }

    return selfWindow.ioc;
  }

  public static set Instance(value) {}

  private container = {};

  constructor() {}

  Registe(type: Function, name: string = undefined, ...args) {
    if (!isFunction(type)) {
      return '只能插入对象';
    }
    let obj = Reflect.construct(type, args);

    if (this.container[type.name]) {
      return;
    }

    this.container[type.name] = obj;
  }

  Get<TType>(type: Function): TType {
    let name = type.name;
    const result = <TType>this.container[name];

    return result;
  }
}
