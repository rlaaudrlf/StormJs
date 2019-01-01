import { ObjectMarker, MarkedObject } from "./ObjectMarker";

export class Dictionary<
	TType extends number | object | string,
	TValue extends any
> {
	private keys: TType[] = [];
	private values: TValue[] = [];

	Add(key: TType, value: TValue): void {
		if (key == null || key == undefined) {
			return;
		}

		let strKey: string;

		if (typeof key == "object") {
			let obj = ObjectMarker.MarkObject(<object>key);
			strKey = obj.___Hash___;
		} else {
			strKey = key.toString();
		}

		this[strKey] = value;
		this.keys.push(key);
		this.values.push(value);
	}

	private getKeyStr(key: TType): string {
		if (typeof key == "object") {
			if (ObjectMarker.IsMarkedObject(<object>key)) {
				return (<MarkedObject>key).___Hash___;
			}

			return undefined;
		} else {
			return key.toString();
		}
	}

	Get(key: TType): TValue {
		let strKey = this.getKeyStr(key);

		return this[strKey];
	}

	Remove(key: TType): void {
		if (key == null || key == undefined) {
			return;
		}

		let strKey = this.getKeyStr(key);

		if (this[strKey] == undefined) {
			return;
		}

		delete this[strKey];

		var index = this.keys.indexOf(key, 0);

		if (index >= 0 && index < this.keys.length) {
			this.keys.splice(index, 1);
			this.values.splice(index, 1);
		}
	}

	Keys(): TType[] {
		return this.keys.copy();
	}

	Values(): TValue[] {
		return this.values.copy();
	}

	ContainsKey(key: TType): boolean {
		let strKey = this.getKeyStr(key);

		return this[strKey] != undefined;
	}
}
