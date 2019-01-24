import { Promise } from 'q';

import { IOC } from '../IOC/IOC';
import { ExceptionFilter } from './ExceptionFilter';
import { ExceptionNormal } from './ExceptionNormal';

export function ExcpetionCatcher(exceptionFilterType: Function = undefined) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const oldFunc = target[propertyKey];

    let func = <string>oldFunc.toString();
    let isAsync = func.indexOf('__awaiter') != -1;

    target[propertyKey] = function(...args) {
      let result;
      let exp: ExceptionFilter;

      if (exceptionFilterType == undefined) {
        exp = IOC.Instance.Get(ExceptionNormal);
      } else {
        exp = IOC.Instance.Get(exceptionFilterType);
      }
      try {
        if (isAsync) {
          result = Promise(resolver => {
            let proValue = <Promise<any>>(<any>oldFunc.apply(this, args));
            proValue
              .then(value => {
                resolver(value);
              })
              .catch(e => {
                exp.OnCatch(e);
              });
          });
        } else {
          result = oldFunc.apply(this, args);
        }
      } catch (e) {
        exp.OnCatch(e);
      }

      return result;
    };

    return target[propertyKey];
  };
}
