import {IOC} from "../IOC/IOC";

export function Controller () {
	return function (target: Function) {
		IOC.Instance.Registe(target);
	};
}
