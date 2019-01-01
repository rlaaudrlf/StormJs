import { Behaviour } from "./Behaviours";
export const enum MouseKey {
	left = 0,
	middle,
	right
}

export class InputEvent {
	x: number;
	y: number;
	mouseKey: MouseKey;
	objects: Behaviour[] = [];
}
