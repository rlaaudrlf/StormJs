import { EventManager } from "./EventManager";
import { isArray } from "util";

export class BindEvent {
	path: string | null = null;
	value: object | number | string | boolean | null = null;
	action: string | null = null;
	key: string | number | null = null;
}

export interface Dict extends Object {
	setValue(key: any, value: any): any;
}

export interface BindData extends Dict {
	___IsBindData: boolean;
	___eventListener: EventManager;
	___path: string;
	___timeOut: any;
	___Cached: BindEvent[];
	___parentEvent: EventManager;
	___Root: object | string | any[] | null;
	___timeOutFunc: () => void | null;
	FindFromPath: () => void;
}

export class DictImpl {
	static Implement(dict: BindData) {
		dict.setValue = (key, value) => {
			dict[key] = value;
			BindDataImpl.defineProperty(dict, dict, key);

			let bindEvent = new BindEvent();
			bindEvent.action = "addNew";
			bindEvent.value = value;
			dict.___eventListener.Call(bindEvent);
			if (dict.___parentEvent != null) {
				dict.___parentEvent.Call(bindEvent);
			}
		};
	}
}

export class BindDataImpl {
	static FindFormPath(dict: BindData, path: string) {
		let paths = path.split["."];

		let result = dict;

		for (const p of paths) {
			result = result[p];
		}

		return result;
	}

	static Implement(
		dict: BindData,
		path: string,
		eventDispather: EventManager | null
	) {
		dict.___eventListener = new EventManager();
		dict.___path = path;
		dict.___timeOut = null;
		dict.___Cached = [];
		dict.___IsBindData = true;
		dict.FindFromPath = () => {
			return BindDataImpl.FindFormPath(<BindData>dict.___Root, dict.___path);
		};

		if (path == "") {
			dict.___Root = null;
		} else {
			dict.___Root = dict.___Root;
		}

		if (eventDispather != null) {
			dict.___parentEvent = eventDispather;
		}

		DictImpl.Implement(dict);
	}

	static defineProperty(object: any, target: BindData, key: string) {
		Object.defineProperty(object, key, {
			set: newValue => {
				object["_____!" + key] = newValue;
				let newPath = target.___path + key;
				let bindEvent = new BindEvent();
				bindEvent.path = newPath;
				bindEvent.key = key;
				bindEvent.value = newValue;
				bindEvent.action = "set";
				target.___Cached.push(bindEvent);
				target.___timeOutFunc = () => {
					target.___eventListener.Call(target.___Cached);
					if (target.___parentEvent != null) {
						target.___parentEvent.Call(target.___Cached);
					}

					target.___Cached = [];
					target.___timeOut = null;
					target.___timeOutFunc = <any>null;
				};

				if (target.___timeOut != null) {
					clearTimeout(target.___timeOut);
				}

				target.___timeOut = setTimeout(() => {
					if (target.___timeOut != undefined) {
						target.___timeOutFunc();
					}
				}, 100);
			},
			get: () => {
				if (target.___timeOut != null) {
					clearTimeout(target.___timeOut);
				}

				if (target.___timeOutFunc != null) {
					let func = target.___timeOutFunc;
					target.___timeOutFunc = null;
					func();
				}

				return object["_____!" + key];
			}
		});
	}
}

export class BindArrayImpl {
	static Implement(array: any[]) {
		let push = array.push;
		let pop = array.pop;
		let shift = array.shift;
		let unshift = array.unshift;

		let dict = <BindData>(<Object>array);

		array.push = (...items) => {
			let bindEvent = new BindEvent();
			bindEvent.action = "push";
			bindEvent.value = items;

			dict.___eventListener.Call(bindEvent);
			if (dict.___parentEvent != null) {
				dict.___parentEvent.Call(bindEvent);
			}

			return push.call(array, ...items);
		};

		array.pop = () => {
			let bindEvent = new BindEvent();
			bindEvent.action = "push";
			dict.___eventListener.Call(bindEvent);
			if (dict.___parentEvent != null) {
				dict.___parentEvent.Call(bindEvent);
			}
			return pop.call(array);
		};

		array.shift = () => {
			let bindEvent = new BindEvent();
			bindEvent.action = "push";
			dict.___eventListener.Call(bindEvent);
			if (dict.___parentEvent != null) {
				dict.___parentEvent.Call(bindEvent);
			}
			return shift.call(array);
		};

		array.unshift = (...items) => {
			let bindEvent = new BindEvent();
			bindEvent.action = "push";
			bindEvent.value = items;
			dict.___eventListener.Call(bindEvent);
			if (dict.___parentEvent != null) {
				dict.___parentEvent.Call(bindEvent);
			}
			return unshift.call(array, ...items);
		};
	}
}

export class DoubleBind {
	static DataToBind(
		object: object | string | any[],
		path = "",
		eventDispather: EventManager | null = null
	) {
		let target = <BindData>object;

		if (target.___IsBindData === true) {
			return object;
		}

		BindDataImpl.Implement(target, path, eventDispather);
		if (isArray(object)) {
			BindArrayImpl.Implement(object);
		}
		const keys = Object.keys(object);
		for (let key of keys) {
			if (key[0] == "_" && key[1] == "_" && key[2] == "_") {
				continue;
			}

			let value = object[key];
			object["_____!" + key] = value;

			if (typeof value == "object" && value != null) {
				DoubleBind.DataToBind(value, key + "." + path, target.___eventListener);
			}

			BindDataImpl.defineProperty(object, target, key);
		}

		return object;
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

let db: any = DoubleBind.DataToBind(a);

db.___eventListener.Regist((key: any, value: any) => {
	console.log(key);
});

db.a = 2;
db.e.a = 1;
db.f[0] = 2;
db.f[0] = 2;
db.f[0] = 2;
db.f[0] = 2;
db.f.push(1);
db.setValue(1, 1);
console.log(a);
