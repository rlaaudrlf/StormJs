import { IOC } from '../IOC/IOC';

export function Service() {
  return function(target: Function) {
    IOC.Instance.Registe(target);
  };
}
