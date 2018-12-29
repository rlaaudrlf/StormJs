import { Md5 } from "ts-md5";

export class DeepCloneInfo {
	source;
	cloned;
}

export class GUID {
	private str: string;

	constructor(str?: string) {
		this.str = str || GUID.getNewGUIDString();
	}

	toString() {
		return this.str;
	}

	private static getNewGUIDString() {
		let d = new Date().getTime();
		if (window.performance && typeof window.performance.now === "function") {
			d += performance.now();
		}
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
			let r = (d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
		});
	}
}

export class DeepCloner {
	static getGuid(): string {
		let hash = Md5.hashStr(Date.now().toString()).toString();
		return hash;
	}
	static Clone(obj: Object): Object {
		if (obj == null || obj == undefined) {
			return;
		}
		let map = {};
		let copyObjList = [];
		let objStack: DeepCloneInfo[] = [];
		let dci = new DeepCloneInfo();
		dci.source = obj;
		let proto = Reflect.getPrototypeOf(obj);
		let newWidget = Reflect.construct(proto.constructor, []);
		dci.cloned = newWidget;
		objStack.push(dci);
		let currentObj: DeepCloneInfo = objStack.pop();
		if (currentObj.source.hash == undefined) {
			currentObj.source.hash = new GUID();
		}
		copyObjList.push(currentObj.cloned);
		map[currentObj.source.hash] = copyObjList.length - 1;
		while (currentObj != undefined) {
			let keys = Reflect.ownKeys(currentObj.source);
			let cloneObj = currentObj.cloned;
			for (const key of keys) {
				if (key == "hash") {
					continue;
				}
				let value = currentObj.source[key];
				let valueType = typeof value;
				if (
					valueType == "boolean" ||
					valueType == "number" ||
					valueType == "string"
				) {
					cloneObj[key] = value;
				} else if (valueType == "object") {
					if (value == null) {
						cloneObj[key] = null;
						continue;
					}
					if (value.hash == undefined) {
						value.hash = new GUID();
					}
					if (map[value.hash] != undefined) {
						cloneObj[key] = copyObjList[map[value.hash]];
						continue;
					}
					let subDci = new DeepCloneInfo();
					subDci.source = value;
					if (cloneObj[key] != null && cloneObj[key] != undefined) {
						subDci.cloned = cloneObj[key];
						objStack.push(subDci);
						copyObjList.push(subDci.cloned);
						map[value.hash] = copyObjList.length - 1;
					} else {
						subDci.cloned = value;
						cloneObj[key] = value;
					}
				}
			}
			currentObj = objStack.pop();
		}
		return copyObjList[0];
	}
}
