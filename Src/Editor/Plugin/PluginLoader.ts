import {Md5} from "ts-md5";
import {existsSync, mkdirSync, readFileSync, readdirSync} from "fs";

import {Dictionary} from "../../Core/Utils/Dictionary ";
import {GlobalData} from "../../Storage";
import {Inject} from "../Core/Decorators/Inject";
import {PluginRunner} from "./PluginRunner";

export class PluginLoader {
	dict:Dictionary<string, any>=new Dictionary<string, any>()

	@Inject(GlobalData)
	globalData:GlobalData

	pluginRunner:PluginRunner = new PluginRunner();

	constructor () {
		this.LoadFiles();
	}

	async LoadFiles () {
		const path = `${process.cwd()}/Plugin`;

		if (!existsSync(path)) {
			mkdirSync(path);
		}

		const values = readdirSync(path);
		const newDict:Dictionary<string, any> = new Dictionary<string, any>();


		for (const value of values) {
			const filePath = `${path}/${value}`;
			const data = readFileSync(filePath, {encoding: "utf-8"});

			const hash = Md5.hashStr(data).toString();

			if (this.dict.ContainsKey(hash)) {
				console.log(filePath);
				continue;
			} else {
				console.
					log(hash);
				try {
					eval(data);
					newDict.Add(hash, window.plugin);
				} catch (err) {
					console.log(err);
				}
			}
		}

		this.dict = newDict;
		this.pluginRunner.Update(this.dict);
	}
}