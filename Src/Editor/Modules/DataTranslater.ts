import { GlobalData } from "../../Storage";
import { writeFileSync } from "fs";
import { serialize } from "../../Core/SerializeHelper";
import { saveFormat } from "../../Core/SaveFormat";
import { Main } from "../../main";
import { Inject } from "../Core/Decorators/Inject";
export class DataTranslater {
	@Inject(GlobalData)
	globalData:GlobalData
	public AutoSave() {
		setTimeout(() => {
			let data = this.Save();
			this.TranslateData(data);
		}, 1000);
	}

	public TranslateData(data: string) {
		let pathStorm = this.globalData.tempPath + "/temp.storm";
		let pathJs = this.globalData.tempPath + "/index.js";

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
