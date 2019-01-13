
let mapper: {} = {};

export function DefineAttributesRenderer(name: any) {
	return (target: Object): void => {
		let str1 = value2MapString(name);

		mapper[str1] = target;
	};
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

export function SelectRenderer<T>(value1): T {
	let str1 = value2MapString(value1);

	return <T>new mapper[str1];
}

