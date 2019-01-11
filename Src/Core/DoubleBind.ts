import { EventManager } from "./EventManager";
import { isArray } from "util";
import { GUID } from "./Utils/GUID";
import { StormObject } from "./Widgets/StormObject";

// export class BindDataImpl {
// 	static FindFormPath(dict: BindData, path: string) {
// 		let paths = path.split["."];

// 		let result = dict;

// 		for (const p of paths) {
// 			result = result[p];
// 		}

// 		return result;
// 	}
// }

export class DoubleBind {
	static DataToBind(obj: object): BindData {
		if (obj == null) {
			return null;
		}

		if ((<BindData>obj).___DoubleBind != undefined) {
			return <BindData>obj;
		}

		let keys = Reflect.ownKeys(obj);
		let binder = this.MakeDoubleBind(obj);

		if (obj instanceof EventManager) {
			return binder;
		}

		binder.___DoubleBind.___CallBackFunc = () => {
			binder.___DoubleBind.___EventManager.Call(binder);
		};

		for (const key of keys) {
			let srcValue = obj[key];
			let srcValueType = typeof srcValue;

			this.DefineProperty(obj, key, binder, srcValue);
			if (
				srcValueType == "object" &&
				srcValue != null &&
				!(srcValue instanceof EventManager)
			) {
				let subBinder: BindData;
				if (isArray(srcValue)) {
					subBinder = this.MakeArrayBinder(srcValue);
				} else {
					subBinder = this.DataToBind(srcValue);
				}

				subBinder.___DoubleBind.___EventManager.Regist(
					binder.___DoubleBind.___CallBackFunc,
					null
				);
			}
		}

		this.MakeAddDelete(binder);

		return binder;
	}

	private static MakeDoubleBind(obj: object): BindData {
		let binder = <BindData>obj;
		if (binder.___DoubleBind == undefined) {
			binder.___DoubleBind = {
				___EventManager: new EventManager(),
				___path: "",
				___CallBackFunc: undefined
			};
		}

		return binder;
	}

	private static MakeAddDelete(binder) {
		binder.___SetNewValue = (key, value) => {
			binder[key] = value;
			this.DefineProperty(binder, key, binder, value);
			if (
				typeof value == "object" &&
				value != null &&
				!(value instanceof EventManager)
			) {
				let subBinder = this.DataToBind(value);
				subBinder.___DoubleBind.___EventManager.Regist(
					binder.___DoubleBind.___CallBackFunc,
					null
				);
			}
			binder.___DoubleBind.___EventManager.Call(binder);
		};

		binder.___DeleteKeyValue = key => {
			let value = binder[key];
			if (typeof value == "object" && value != null) {
				(<BindData>value).___DoubleBind.___EventManager.remove(
					binder.___DoubleBind.___CallBackFunc
				);
			}
			binder.___DoubleBind.___EventManager.Call(binder);
		};
	}

	private static MakeArrayBinder(srcValue: any[]): BindData {
		let subBinder = this.DataToBind(srcValue);
		let push = srcValue.push;
		srcValue.push = (...items): number => {
			if (items.length == 0) {
				return;
			}
			for (const item of items) {
				if (
					typeof item == "object" &&
					item != null &&
					!(item instanceof EventManager)
				) {
					let itemBind = this.DataToBind(item);
					itemBind.___DoubleBind.___EventManager.Regist(
						subBinder.___DoubleBind.___CallBackFunc,
						null
					);
				}
			}

			let value = push.call(srcValue, items);

			subBinder.___DoubleBind.___EventManager.Call(subBinder);
			return value;
		};

		let unshift = srcValue.unshift;
		srcValue.unshift = (...items): number => {
			if (items.length == 0) {
				return;
			}
			for (const item of items) {
				if (
					typeof item == "object" &&
					item != null &&
					!(item instanceof EventManager)
				) {
					let itemBind = this.DataToBind(item);
					itemBind.___DoubleBind.___EventManager.Regist(
						subBinder.___DoubleBind.___CallBackFunc,
						null
					);
				}
			}
			let value = unshift(...items);
			subBinder.___DoubleBind.___EventManager.Call(subBinder);
			return value;
		};

		let shift = srcValue.shift;

		srcValue.shift = () => {
			let value = shift();

			if (typeof value == "object" && value != null) {
				let valueBinder = <BindData>value;
				valueBinder.___DoubleBind.___EventManager.remove(
					subBinder.___DoubleBind.___CallBackFunc
				);
			}
			subBinder.___DoubleBind.___EventManager.Call(subBinder);
			return value;
		};

		let pop = srcValue.pop;

		srcValue.pop = () => {
			let value = pop();
			if (typeof value == "object" && value != null) {
				let valueBinder = <BindData>value;
				valueBinder.___DoubleBind.___EventManager.remove(
					subBinder.___DoubleBind.___CallBackFunc
				);
			}
			subBinder.___DoubleBind.___EventManager.Call(subBinder);
			return value;
		};

		let first = srcValue.first;

		srcValue.first = () => {
			let value = first();
			if (typeof value == "object" && value != null) {
				let valueBinder = <BindData>value;
				valueBinder.___DoubleBind.___EventManager.remove(
					subBinder.___DoubleBind.___CallBackFunc
				);
			}
			subBinder.___DoubleBind.___EventManager.Call(subBinder);
			return value;
		};

		let remove = srcValue.remove;

		srcValue.remove = (item: any) => {
			remove(item);
			if (typeof item == "object" && item != null) {
				let valueBinder = <BindData>item;
				valueBinder.___DoubleBind.___EventManager.remove(
					subBinder.___DoubleBind.___CallBackFunc
				);
			}
			subBinder.___DoubleBind.___EventManager.Call(subBinder);
			return srcValue;
		};

		let addRange = srcValue.addRange;

		srcValue.addRange = (list: any[]) => {
			for (const item of list) {
				if (
					typeof item == "object" &&
					item != null &&
					!(item instanceof EventManager)
				) {
					let itemBind = this.DataToBind(item);
					itemBind.___DoubleBind.___EventManager.Regist(
						subBinder.___DoubleBind.___CallBackFunc,
						null
					);
				}
			}

			addRange(list);
			subBinder.___DoubleBind.___EventManager.Call(subBinder);
		};

		return subBinder;
	}

	private static DefineProperty(obj, key, binder: BindData, srcValue) {
		if (srcValue instanceof GUID) {
			return;
		}

		if (isArray(obj) && key == "length") {
			return;
		}

		binder.___DoubleBind[key] = srcValue;
		Object.defineProperty(obj, key, {
			set: value => {
				if (binder.___DoubleBind[key] == value) {
					return;
				}

				if (value == null || value == undefined) {
					value = obj.___DoubleBind[key];
					if (typeof value == "object" && value != null) {
						let subBinder = <BindData>value;
						subBinder.___DoubleBind.___EventManager.remove(
							binder.___DoubleBind.___CallBackFunc
						);
					}

					obj.___DoubleBind[key] = null;
				}

				if (typeof value == "object" && !(value instanceof EventManager)) {
					let subBinder = this.DataToBind(value);

					subBinder.___DoubleBind.___EventManager.remove(
						binder.___DoubleBind.___CallBackFunc
					);

					subBinder.___DoubleBind.___EventManager.Regist(
						binder.___DoubleBind.___CallBackFunc,
						null
					);

					obj.___DoubleBind[key] = subBinder;
				} else {
					obj.___DoubleBind[key] = value;
				}

				binder.___DoubleBind.___EventManager.Call(binder, key, value);
			},
			get: () => {
				return binder.___DoubleBind[key];
			}
		});
	}

	static Bind2Data() {}
}

let a = {
	a: 1,
	b: 2,
	c: "123",
	d: "sdf",
	e: { a: 1, b: 2 },
	f: [1, 2, 3]
};

let db: any = <BindData>DoubleBind.DataToBind(a);

db.___DoubleBind.___EventManager.Regist((key: any, value: any) => {
	console.log(key);
}, null);

db.a = 2;
db.e.a = 1;
db.f[0] = 2;
db.f[0] = 2;
db.f[0] = 2;
db.f[0] = 2;
db.f.push(1);
console.log(a);

export interface BindDataInner {
	___EventManager: EventManager;
	___path: string;
	___CallBackFunc: () => void;
}
export interface BindData {
	___DoubleBind: BindDataInner;
	___SetNewValue: (key: string, value: any) => void;
	___DeleteKeyValue: (key: string) => void;
	___SetValueByPath: (path: string, value: any) => void;
}
