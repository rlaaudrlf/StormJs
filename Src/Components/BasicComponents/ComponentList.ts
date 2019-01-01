let map = [];

export function GetComponentList(): any[] {
	return map;
}

export function ComponentList(path: string) {
	return (target: Object): void => {
		map.push({ path, target });
	};
}
