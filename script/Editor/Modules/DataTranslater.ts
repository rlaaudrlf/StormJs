import { Storage } from "../../Storage";
import { writeFileSync } from "fs";
import { serialize } from "../../Core/SerializeHelper";
import { saveFormat } from "../../Core/SaveFormat";
import { Main } from "../../main";
export class DataTranslater {
	public AutoSave() {
		setTimeout(() => {
			let data = this.Save();
			this.TranslateData(data);
		}, 1000);
	}

	public TranslateData(data: string) {
		let pathStorm = Storage.instance.tempPath + "/temp.storm";
		let pathJs = Storage.instance.tempPath + "/index.js";

		writeFileSync(pathStorm, data);
	}

	public Save() {
		const items = Main.main.panelWorking.workItems;

		let data = "";
		const a = new saveFormat();
		for (const item of items) {
			a.objs.push(item.stormObj);
		}

		data = serialize(a);
		return JSON.stringify(data);
	}
}
