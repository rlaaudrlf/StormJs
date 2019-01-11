interface Array<T> {
	addRange(list: T[]);
	remove(T: any): Array<T>;
	first(): T;
	copy(): T[];
}

Array.prototype.addRange = function<T>(this: T[], list: T[]) {
	for (const item of list) {
		this.push(item);
	}

	return this;
};

Array.prototype.remove = function<T>(this: T[], element: T): T[] {
	var index = this.indexOf(element);
	if (index > -1) {
		this.splice(index, 1);
	}
	return this;
};

Array.prototype.first = function<T>(this: T[]): T {
	if (this.length > 0) {
		return this[0];
	}

	return null;
};

Array.prototype.copy = function<T>(this: T[]): T[] {
	let result = [];
	for (let index = 0; index < this.length; index++) {
		result.push(this[index]);
	}

	return result;
};
