import { GUID } from "../Widgets/DeepCloner";

export interface MarkedObject {
	___Hash___: string;
}

export class ObjectMarker {
	private static keyName: string = "___Hash___";

	static MarkObject(obj: object): MarkedObject {
		if (obj[this.keyName] == undefined) {
			obj[this.keyName] = new GUID().toString();
		}

		return <MarkedObject>obj;
	}

	static IsMarkedObject(obj: object): boolean {
		return obj[this.keyName] != undefined;
	}
}
