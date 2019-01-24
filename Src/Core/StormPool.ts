import {StormObject} from "./StormObject";
export class StormPool {
	public static instance: StormPool = new StormPool();

	private constructor () {}

	stormObjects: { [key: string]: StormObject } = {};

	public add (stormObject: StormObject) {
		this.stormObjects[stormObject.hash] = stormObject;
	}

	public get (hash: string) {
		return this.stormObjects[hash];
	}

	public remove (stormObject: StormObject) {
		this.stormObjects[stormObject.hash] = null;
	}
}