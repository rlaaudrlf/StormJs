import { IOC } from '../IOC/IOC';
export function Inject(typeFunc, name: string = undefined) {
  return function(target: any, propertyName: string) {
    target[propertyName] = IOC.Instance.Get(typeFunc);
  };
}
