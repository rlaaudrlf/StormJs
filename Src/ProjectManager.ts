import { existsSync, mkdirSync, writeFileSync } from "fs";
import { GlobalData } from "./Storage";
import { Inject } from "./Editor/Core/Decorators/Inject";
const { ipcRenderer } = require("electron");

export class ProjectManager {
	@Inject(GlobalData)
	globalData:GlobalData
	public NewProject() {
		ipcRenderer.send("open-file-dialog");
		ipcRenderer.on("selected-directory", (event, path) => {
			console.log("opend:" + path);
			this.globalData.projectPath = path;
			var pathAssets = path + "/" + "assets";
			if (!existsSync(pathAssets)) {
				mkdirSync(pathAssets);
			}

			var pathConfig = path + "/" + ".stormConfig";

			if (!existsSync(pathConfig)) {
			}

			writeFileSync(pathConfig, "");
		});
	}

	public LoadProject() {
		ipcRenderer.send("open-file-dialog");
		ipcRenderer.on("selected-directory", (event, path) => {
			console.log("opend:" + path);
			this.globalData.projectPath = path;
			var pathAssets = path + "/" + "assets";
			if (!existsSync(pathAssets)) {
				console.log("not storm Project Directory");
				return;
			}

			var pathConfig = path + "/" + ".stormConfig";

			if (!existsSync(pathConfig)) {
				console.log("not storm Project Directory");
				return;
			}

			writeFileSync(pathConfig, "");
		});
	}

	public Save() {
		if ((this.globalData.projectPath = "")) {
			return;
		}
		var path = this.globalData.projectPath;
		var pathTemp = path + "/" + "temp";
		if (!existsSync(pathTemp)) {
            mkdirSync(pathTemp);
        }
        
        
	}

	public Load() {}

	public Export2Html() {}

	public Export2StormFile() {}
}
