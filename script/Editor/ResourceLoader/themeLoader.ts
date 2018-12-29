import { StyleCacher } from '../../Core/StyleCacher';
import {
	readdirSync,
	lstatSync,
	readFileSync
} from "fs";
const path = require("path");

export class ThemeLoader {
	public static instance: ThemeLoader = new ThemeLoader();

	private constructor() {
		this.Load();
	}

	themes: { [key: string]: string } = {};
	public Load() {
		let components: any[] = [];
		var filePath = path.resolve(process.cwd(), "./themes");

		const files = readdirSync(filePath);
		var self = this;
		files.forEach(function(item, index) {
			const fpath = filePath + "\\" + item;
			let stat = lstatSync(fpath);
			if (stat.isFile() === true) {
				components.push(item);
				var file = readFileSync(fpath);
				self.themes[item] = file.toString();
				StyleCacher.instance.AddStyle(item, file.toString());
			}
		});
	}

	public getTheme(name: string) {
		return this.themes[name];
	}
}
