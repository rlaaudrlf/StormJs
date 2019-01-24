import {DataGetter} from "../../../api2";
export function LazyLoadObj (property: string, emptyValue: any = null, url?: string) {
	return function (target: any, propertyName: string) {
		const needUpdate = true;
		let realValue;

		Object.defineProperty(target, propertyName, {
			async get () {
				if (realValue != emptyValue) {
					return realValue;
				}
				const content = {};

				content[property] = this[property];

				const value = await DataGetter.instance.post(url, content);

				realValue = value;

				return value;
			},
			async set (value) {
				realValue = value;
			}
		});
	};
}
