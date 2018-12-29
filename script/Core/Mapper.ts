import "reflect-metadata";

export class Mapper {
	mapperInfos = {};
	static instance: Mapper = new Mapper();

	private constructor() {}

	add(key, value) {
		this.mapperInfos[key] = value;
	}

	getValue(key): any {
		let value = this.mapperInfos[key];
		return value;
	}
}

export function DefineMapper(
	value1: object | string | number | Function,
	value2: object | string | number | Function
): Function {
	return (target: Object): void => {
		let key = "mapper:";
		let str1 = value2MapString(value1);
		let str2 = value2MapString(value2);

		Reflect.defineMetadata(key + str1 + str2, target, target);
		Mapper.instance.add(key + str1 + str2, target);
	};
}

export function CallMapper<T>(value1, value2): T {
	let key = "mapper:";
	let str1 = value2MapString(value1);
	let str2 = value2MapString(value2);

	return <T>Mapper.instance.getValue(key + str1 + str2);
}

function value2MapString(value): string {
	let type = typeof value;
	let result: string;
	if (type == "function") {
		result = value.name;
	} else {
		result = value;
	}
	return result;
}
