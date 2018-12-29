import { StormObject } from "./Widgets/StormObject";
import { Transform } from "./Attributes/Transform";
export class Behaviour {
	isDisposed: boolean = false;
	stormObject: StormObject;
	transform: Transform;
	constructor() {}

	awake() {}

	start() {}

	onEnable() {}

	onDisable() {}

	// update() {}

	// lateUpdate() {}

	onDestroy() {}

	dispose() {
		this.onDestroy();
		this.isDisposed = true;
	}
}
