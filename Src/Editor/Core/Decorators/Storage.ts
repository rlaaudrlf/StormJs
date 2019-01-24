import {IOC} from "../IOC/IOC";

export function Storage () {
	return function (target: Function) {
		IOC.Instance.Registe(target);
	};
}
