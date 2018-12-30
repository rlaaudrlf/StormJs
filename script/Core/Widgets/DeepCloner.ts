import { StormObject } from "./StormObject";
import { Behaviour } from "../Behaviours";
import { Transform } from "../Attributes/Transform";

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
	static newObj(target, key, srcValue) {
		if (target[key] == null) {
			let proto = Reflect.getPrototypeOf(srcValue);
			let obj = Reflect.construct(proto.constructor, []);
			target[key] = obj;
		}
	}

	static deepClone(
		src: Object,
		target: Object,
		srcStormObjectMap: {},
		srcTransformMap: {},
		srcBehaviourMap: {},
		refMap: {}
	) {
		let keys = Reflect.ownKeys(src);

		for (const key in keys) {
			let srcValue = src[key];
			let srcValueType = typeof srcValue;

			if (
				srcValueType == "boolean" ||
				srcValueType == "number" ||
				srcValueType == "string" ||
				srcValueType == "symbol" ||
				srcValueType == "undefined"
			) {
				target[key] = srcValue;
			} else if (srcValueType == "object") {
				if (srcValue == null) {
					target[key] = null;
					continue;
				}
				if (srcValue instanceof GUID) {
					continue;
				}

				if (srcValue instanceof Behaviour) {
					if (
						srcStormObjectMap[srcValue.stormObject.hash.toString()] != undefined
					) {
						if (refMap[srcValue.hash.toString()] == undefined) {
							let behaviour = srcBehaviourMap[srcValue.hash.toString()];
							target[key] = behaviour;
							refMap[srcValue.hash.toString()] = target[key];
							this.deepClone(
								srcValue,
								target[key],
								srcStormObjectMap,
								srcTransformMap,
								srcBehaviourMap,
								refMap
							);
						} else {
							target[key] = refMap[srcValue.hash.toString()];
						}
					} else {
						target[key] = srcValue;
					}
				} else if (srcValue instanceof StormObject) {
					if (srcStormObjectMap[srcValue.hash.toString()] == undefined) {
						if (refMap[srcValue.hash.toString()] != undefined) {
							let behaviour = srcStormObjectMap[srcValue.hash.toString()];
							target[key] = behaviour;
							refMap[srcValue.hash.toString()] = target[key];
							this.deepClone(
								srcValue,
								target[key],
								srcStormObjectMap,
								srcTransformMap,
								srcBehaviourMap,
								refMap
							);
						} else {
							target[key] = refMap[srcValue.hash.toString()];
						}
					} else {
						target[key] = srcValue;
					}
				} else if (srcValue instanceof Transform) {
					if (
						srcStormObjectMap[srcValue.StormObject.hash.toString()] != undefined
					) {
						if (refMap[srcValue.hash.toString()] == undefined) {
							let behaviour = srcTransformMap[srcValue.hash.toString()];
							target[key] = behaviour;
							refMap[srcValue.hash.toString()] = target[key];
							this.deepClone(
								srcValue,
								target[key],
								srcStormObjectMap,
								srcTransformMap,
								srcBehaviourMap,
								refMap
							);
						} else {
							target[key] = refMap[srcValue.hash.toString()];
						}
					} else {
						target[key] = srcValue;
					}
				} else {
					if (srcValue["hash"] == undefined) {
						srcValue["hash"] = new GUID();
					}
					if (refMap[srcValue["hash"]] != undefined) {
						target[key] = refMap[srcValue["hash"]];
					} else {
						this.newObj(target, key, srcValue);
						refMap[srcValue["hash"]] = target[key];
						this.deepClone(
							srcValue,
							target[key],
							srcStormObjectMap,
							srcTransformMap,
							srcBehaviourMap,
							refMap
						);
					}
				}
			}
		}
	}

	static Clone(stormObject: StormObject): StormObject {
		let transformMap: { [key: string]: Transform } = {};

		let srcStack: StormObject[] = [];
		let copyStack: StormObject[] = [];

		let srcCurrentNode: StormObject = stormObject;
		let copyRoot: StormObject = new StormObject();
		let copyCurrentNode = copyRoot;

		let srcBehaviours: Behaviour[] = [];
		let copyBehaviours: Behaviour[] = [];

		let srcBehaviourMap: {} = {};
		let srcTransformMap: {} = {};
		let srcStormObjectMap: {} = {};

		while (srcCurrentNode != undefined) {
			for (const child of srcCurrentNode.transfrom.Children) {
				srcStack.push(child.StormObject);
				let obj = new StormObject();
				obj.transfrom.Parent = copyCurrentNode.transfrom;

				copyStack.push(obj);
			}

			transformMap[srcCurrentNode.transfrom.hash.toString()] =
				srcCurrentNode.transfrom;

			let renderer = srcCurrentNode.getRenderer();
			if (renderer != undefined) {
				let proto = Reflect.getPrototypeOf(renderer);
				copyCurrentNode.setRenderer(<any>proto.constructor);
				srcBehaviours.push(renderer);
				copyBehaviours.push(copyCurrentNode.getRenderer());
			}

			let behaviours = srcCurrentNode.getBehaviours();

			for (let index = 0; index < behaviours.length; index++) {
				let behaviour = behaviours[index];
				let proto = Reflect.getPrototypeOf(behaviour);
				copyCurrentNode.addBehaviour(<any>proto.constructor);

				srcBehaviours.push(behaviour);
				copyBehaviours.push(copyCurrentNode.getBehaviours()[index]);
			}

			srcTransformMap[srcCurrentNode.transfrom.hash.toString()] =
				copyCurrentNode.transfrom;
			srcStormObjectMap[srcCurrentNode.hash.toString()] = copyCurrentNode;

			srcCurrentNode = srcStack.pop();
			copyCurrentNode = copyStack.pop();
		}

		for (let index = 0; index < srcBehaviours.length; index++) {
			let transform = srcBehaviours[index];
			srcBehaviourMap[transform.hash.toString()] = copyBehaviours[index];
		}

		srcStack = [];
		copyStack = [];
		copyCurrentNode = copyRoot;
		srcCurrentNode = stormObject;
		let refMap = {};
		
		while (srcCurrentNode != undefined) {
			for (const child of srcCurrentNode.transfrom.Children) {
				srcStack.push(child.StormObject);
			}
			for (const child of srcCurrentNode.transfrom.Children) {
				copyStack.push(child.StormObject);
			}

			this.deepClone(
				srcCurrentNode,
				copyCurrentNode,
				srcStormObjectMap,
				srcTransformMap,
				srcBehaviourMap,
				refMap
			);

			srcCurrentNode = srcStack.pop();
			copyCurrentNode = copyStack.pop();
		}

		return copyRoot;
	}
}
