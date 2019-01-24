import {IOC} from "./IOC/IOC";

export function Entity () {
	return function (target: Function) {
		IOC.Instance.Registe(target);
	};
}
