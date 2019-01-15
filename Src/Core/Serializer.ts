import { GUID } from "./Utils/GUID";
import { Behaviour } from "./Behaviours";
import { Transform } from "./Attributes/Transform";
import { StormObject } from "./Widgets/StormObject";

let caches = {};

caches["Array"] = Array;

export function Serializable() {
	return (target: Function): void => {
		caches[target.name] = target;
	};
}

class SerializeInfo {
	properties: any = {};
	hash: GUID;
	valueType: string;
	refHash: GUID | undefined = undefined;
	isRefData: boolean = false;
	____isSerializeInfo = true;
}

class DeSerializeInfo {
	key: string;
	target: Object;
	refHash: GUID;
}

class DInfo {
	owner: Object;
	self: SerializeInfo;
	key: string | number | symbol;
}

export class Serializer {
	static Serialize(target: StormObject) {
		console.log(target);
		let refMap = {};

		let currentSrc = target;
		let currentClone: SerializeInfo = new SerializeInfo();
		currentClone.hash = target.hash;
		currentClone.valueType = Reflect.getPrototypeOf(target).constructor.name;
		refMap[target.hash.toString()] = currentClone;

		let cloneRoot = currentClone;
		let srcStack = [];
		let cloneStack = [];

		let selfRefs = {};

		let currentTransform = target.transfrom;
		let transformsStack = [];

		while (currentTransform != undefined) {
			selfRefs[currentTransform.hash.toString()] = true;
			selfRefs[currentTransform.StormObject.hash.toString()] = true;

			let renderer = currentTransform.StormObject.getRenderer();

			if (renderer != undefined) {
				selfRefs[renderer.hash.toString()] = true;
			}

			for (const behaviour of currentTransform.StormObject.behaviours) {
				selfRefs[behaviour.hash.toString()] = true;
			}

			for (const child of currentTransform.Children) {
				transformsStack.push(child);
			}

			currentTransform = transformsStack.shift();
		}

		while (currentSrc != undefined) {
			let keys = Reflect.ownKeys(currentSrc);
			for (const key of keys) {
				let srcValue = currentSrc[key];
				let srcValueType = typeof srcValue;

				if (
					srcValueType == "boolean" ||
					srcValueType == "number" ||
					srcValueType == "string" ||
					srcValueType == "symbol" ||
					srcValueType == "undefined"
				) {
					currentClone.properties[key] = currentSrc[key];
				} else if (srcValueType == "object") {
					if (srcValue == null) {
						currentClone.properties[key] = null;
						continue;
					}
					if (srcValue instanceof GUID) {
						continue;
					}

					if (
						srcValue instanceof Behaviour ||
						srcValue instanceof Transform ||
						srcValue instanceof StormObject
					) {
						let hash: GUID;
						if (srcValue instanceof Behaviour) {
							hash = srcValue.stormObject.hash;
						} else if (srcValue instanceof StormObject) {
							hash = srcValue.hash;
						} else if (srcValue instanceof Transform) {
							hash = srcValue.StormObject.hash;
						}

						let ignored = selfRefs[hash.toString()];

						if (ignored == undefined) {
							continue;
						}

						if (refMap[srcValue.hash.toString()] == undefined) {
							let obj = new SerializeInfo();
							obj.hash = srcValue.hash;
							obj.valueType = Reflect.getPrototypeOf(srcValue).constructor.name;
							currentClone.properties[key] = obj;

							srcStack.push(srcValue);
							cloneStack.push(obj);
							refMap[srcValue.hash.toString()] = obj;
						} else {
							let obj = new SerializeInfo();
							obj.refHash = refMap[srcValue.hash.toString()]["hash"];
							currentClone.properties[key] = obj;
						}
					} else {
						if (srcValue["hash"] == undefined) {
							srcValue["hash"] = new GUID();
						}

						if (refMap[srcValue["hash"].toString()] != undefined) {
							let obj = new SerializeInfo();
							obj.refHash = refMap[srcValue.hash.toString()]["hash"];
							currentClone.properties[key] = obj;
						} else {
							let obj = new SerializeInfo();
							obj.hash = srcValue.hash;
							obj.valueType = Reflect.getPrototypeOf(srcValue).constructor.name;
							currentClone.properties[key] = obj;

							srcStack.push(srcValue);
							cloneStack.push(obj);
							refMap[srcValue.hash.toString()] = obj;
						}
					}
				}
			}
			currentSrc = srcStack.shift();
			currentClone = cloneStack.shift();
		}

		return cloneRoot;
	}

	static Deserialize(target: SerializeInfo): StormObject {
		let refMap = {};
		let currentSrc = target;
		let srcStack = [];
		let refMap2: DeSerializeInfo[] = [];

		while (currentSrc != undefined) {
			let info = <SerializeInfo>currentSrc;

			refMap[(<any>info.hash).str] = info;

			for (const key in info.properties) {
				let srcValue = currentSrc.properties[key];
				let srcValueType = typeof srcValue;
				if (srcValueType == "object") {
					let info2 = <SerializeInfo>srcValue;

					if (info2 == null) {
						continue;
					}
					if (info2.refHash != undefined) {
						let deSerializeInfo = new DeSerializeInfo();
						deSerializeInfo.key = key;
						deSerializeInfo.target = currentSrc.properties;
						deSerializeInfo.refHash = info2.refHash;

						refMap2.push(deSerializeInfo);
					} else if (info2.____isSerializeInfo != undefined) {
						srcStack.push(info2);
					}
				}
			}

			currentSrc = srcStack.shift();
		}

		console.log(refMap2);
		console.log(target);

		for (const ref of refMap2) {
			let value = refMap[(<any>ref.refHash).str];
			ref.target[ref.key] = value;
		}

		let root: StormObject | undefined = undefined;
		currentSrc = target;
		srcStack = [];
		refMap = {};
		let currentDInfo: DInfo = new DInfo();
		currentDInfo.self = currentSrc;

		while (currentDInfo != undefined) {
			let info = currentDInfo.self;
			let obj = caches[info.valueType];

			if (obj == undefined) {
				console.log(info);
				currentDInfo = srcStack.shift();
				continue;
			}

			obj = new obj();

			if (currentDInfo.owner != undefined) {
				currentDInfo.owner[currentDInfo.key] = obj;
			}

			if (info.valueType == "StormObject" && root == undefined) {
				root = obj;
			}

			let keys = Reflect.ownKeys(info.properties);

			refMap[(<any>info.hash).str] = obj;
			for (const key of keys) {
				let srcValue = info.properties[key];
				let srcValueType = typeof srcValue;
				if (
					srcValueType == "boolean" ||
					srcValueType == "number" ||
					srcValueType == "string" ||
					srcValueType == "symbol" ||
					srcValueType == "undefined"
				) {
					obj[key] = srcValue;
				} else if (srcValueType == "object") {
					if (srcValue == null) {
						obj[key] = null;
						continue;
					}
					if (srcValue instanceof GUID) {
						continue;
					}
					let info2 = <SerializeInfo>srcValue;

					if (refMap[(<any>info2.hash).str] != undefined) {
						obj[key] = refMap[(<any>info2.hash).str];
						continue;
					}

					let dInfo: DInfo = new DInfo();
					dInfo.owner = obj;
					dInfo.key = key;
					dInfo.self = srcValue;

					srcStack.push(dInfo);
				}
			}
			currentDInfo = srcStack.shift();
		}

		return root;
	}
}
