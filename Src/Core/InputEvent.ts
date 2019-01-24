import {Behaviour} from "./Behaviours";
import {StormObject} from "./Widgets/StormObject";
export const enum MouseKey {
	left = 0,
	middle,
	right
}

export class InputEvent {
	x: number;

	y: number;

	mouseKey: MouseKey;

	behaviours: Array<Behaviour> = [];

	objects: Array<StormObject> = [];
}