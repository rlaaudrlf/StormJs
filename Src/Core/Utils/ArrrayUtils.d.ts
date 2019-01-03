declare interface Array<T> {
	remove(T: any): Array<T>;
	first(): T;
	copy(): T[];
}
