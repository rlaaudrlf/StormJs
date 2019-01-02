import { StormObject } from "./StormObject";
import { Behaviour } from "../Behaviours";
import { Transform } from "../Attributes/Transform";
import { GUID } from "../Utils/GUID";
import { Label } from "../../Components/BasicComponents/Label";
import { isArray } from "util";
console.log(213);

let log

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
		refMap: {}
	) {
		let currentSrc = src;
		let currentClone = target;

		let srcStack = [];
		let cloneStack = [];

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
					currentClone[key] = srcValue;
				} else if (srcValueType == "object") {
					if (srcValue == null) {
						currentClone[key] = null;
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
						let hash: string;
						if (srcValue instanceof Behaviour) {
							hash = srcValue.stormObject.hash.toString();
						} else if (srcValue instanceof StormObject) {
							hash = srcValue.hash.toString();
						} else if (srcValue instanceof Transform) {
							hash = srcValue.StormObject.hash.toString();
						}
						if (srcStormObjectMap[hash] != undefined)
							if (refMap[srcValue.hash.toString()] == undefined) {
								let behaviour = srcStormObjectMap[srcValue.hash.toString()];

								currentClone[key] = behaviour;
								refMap[srcValue.hash.toString()] = currentClone[key];
								srcStack.push(srcValue);
								cloneStack.push(currentClone[key]);
							} else {
								currentClone[key] = refMap[srcValue.hash.toString()];
							}
						else {
							currentClone[key] = srcValue;
						}
					} else {
						if (srcValue["hash"] == undefined) {
							srcValue["hash"] = new GUID();
						}

						if (refMap[srcValue["hash"].toString()] != undefined) {
							currentClone[key] = refMap[srcValue["hash"].toString()];
						} else {
							this.newObj(currentClone, key, srcValue);
							refMap[srcValue["hash"].toString()] = currentClone[key];

							srcStack.push(srcValue);
							cloneStack.push(currentClone[key]);
						}
					}
				}
			}
			currentSrc = srcStack.shift();
			currentClone = cloneStack.shift();
		}

		// 	if (
		// 		srcStormObjectMap[srcValue.StormObject.hash.toString()] != undefined
		// 	) {
		// 		if (refMap[srcValue.hash.toString()] == undefined) {
		// 			let behaviour = srcStormObjectMap[srcValue.hash.toString()];
		// 			target[key] = behaviour;
		// 			refMap[srcValue.hash.toString()] = target[key];
		// 			this.deepClone(srcValue, target[key], srcStormObjectMap, refMap);
		// 		} else {
		// 			target[key] = refMap[srcValue.hash.toString()];
		// 		}
		// 	} else {
		// 		target[key] = srcValue;
		// 	}
		// }
	}

	static Clone(stormObject: StormObject): StormObject {
		let transformMap: { [key: string]: Transform } = {};

		let srcStack: StormObject[] = [];
		let copyStack: StormObject[] = [];

		let srcCurrentNode: StormObject = stormObject;
		let copyRoot: StormObject = new StormObject();
		let copyCurrentNode = copyRoot;

		let srcMap: { [key: string]: StormObject | Behaviour | Transform } = {};

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

				srcMap[renderer.hash.toString()] = copyCurrentNode.getRenderer();
			}

			let behaviours = srcCurrentNode.getBehaviours();

			for (let index = 0; index < behaviours.length; index++) {
				let behaviour = behaviours[index];

				let proto = Reflect.getPrototypeOf(behaviour);
				copyCurrentNode.addBehaviour(<any>proto.constructor);
				let beh = copyCurrentNode.getBehaviours()[index];
				srcMap[behaviour.hash.toString()] = beh;

				if (behaviour instanceof Label) {
					// log=
					console.log(beh.hash);
					console.log(behaviour.hash);
				}
			}

			srcMap[srcCurrentNode.transfrom.hash.toString()] =
				copyCurrentNode.transfrom;
			srcMap[srcCurrentNode.hash.toString()] = copyCurrentNode;

			srcCurrentNode = srcStack.pop();
			copyCurrentNode = copyStack.pop();
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
			for (const child of copyCurrentNode.transfrom.Children) {
				copyStack.push(child.StormObject);
			}

			this.deepClone(srcCurrentNode, copyCurrentNode, srcMap, refMap);

			srcCurrentNode = srcStack.pop();
			copyCurrentNode = copyStack.pop();
		}

		return copyRoot;
	}
}
