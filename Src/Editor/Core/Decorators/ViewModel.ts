import {IOC} from "../IOC/IOC";

export function ViewModel () {
	return function (target: Function) {
		IOC.Instance.Registe(target);
	};
}
