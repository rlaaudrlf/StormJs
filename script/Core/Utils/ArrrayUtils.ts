interface Array<T> {
	remove(T: any): Array<T>;
}

Array.prototype.remove = function<T>(this: T[], element: T): T[] {
	var index = this.indexOf(element);
	if (index > -1) {
		this.splice(index, 1);
	}
	return this;
};
