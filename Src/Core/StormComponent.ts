import { Behaviour } from "./Behaviours";
import { Action } from "./Action/Action";
import { EventManager } from "./EventManager";

export class BindDataInfo {
	value: object;
	key: string;
}

export class StormComponent extends Behaviour {
	action: Action = new Action();
	onValueChange: EventManager = new EventManager();
	setCompData(data: any) {}
	findBindData(data: object, path: string) {
		let paths = path.split(".");
		let currentValue = data;

		for (let index = 0; index < paths.length - 1; index++) {
			let key = paths[index];
			currentValue = data[key];
		}

		let bindDataInfo = new BindDataInfo();
		bindDataInfo.key = paths[paths.length - 1];
		bindDataInfo.value = currentValue;

		return bindDataInfo;
	}
}
