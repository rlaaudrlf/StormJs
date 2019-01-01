import { StormObject } from "./Widgets/StormObject";
import { Transform } from "./Attributes/Transform";
import { GUID } from './Widgets/DeepCloner';
export class Behaviour {
	isDisposed: boolean = false;
	stormObject: StormObject;
	transform: Transform;
	hash: GUID = new GUID();
	constructor() {}

	awake() {}

	start() {}

	onEnable() {}

	onDisable() {}

	// update() {}

	// lateUpdate() {}

	onDestroy() {}

	destroy() {
		this.onDestroy();
		this.isDisposed = true;
	}
}
