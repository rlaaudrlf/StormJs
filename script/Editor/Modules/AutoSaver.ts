import { saveFormat, StyleFormat, StyleFileInfo } from "../../Core/SaveFormat";
import { Main } from "../../main";
import { serialize } from "../../Core/SerializeHelper";
import { writeFileSync } from "fs";
import { Storage } from "../../Storage";
import { ThemeLoader } from "../ResourceLoader/themeLoader";

export class AutoSaver {
	public OnAutoSave: () => void;
	public StartAutoSaveTask() {
		setTimeout(() => {
			this.Save();
			if (this.OnAutoSave != null) {
				this.OnAutoSave();
			}
		}, 1000);
	}

	public Save() {
		const items = Main.main.panelWorking.workItems;
		const filePath = Storage.instance.tempPath + "./test.storm";
		const format = new saveFormat();
		for (const item of items) {
			format.objs.push(item.stormObj);
		}

		let data = serialize(format);
		writeFileSync(filePath, JSON.stringify(data));
		const stylePath = Storage.instance.tempPath + "/styles.style";
		console.log(stylePath);

		let sf: StyleFormat = new StyleFormat();
		for (const key in ThemeLoader.instance.themes) {
			if (ThemeLoader.instance.themes.hasOwnProperty(key)) {
				const element = ThemeLoader.instance.themes[key];
				let sfi: StyleFileInfo = new StyleFileInfo();
				sfi.name = key;
				sfi.content = element;
				sf.objs.push(sfi);
			}
		}

		writeFileSync(stylePath, JSON.stringify(serialize(sf)));
	}
}
