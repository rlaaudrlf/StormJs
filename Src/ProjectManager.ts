import { existsSync, mkdirSync, writeFileSync } from "fs";
import { Storage } from "./Storage";
const { ipcRenderer } = require("electron");

export class ProjectManager {
	public NewProject() {
		ipcRenderer.send("open-file-dialog");
		ipcRenderer.on("selected-directory", (event, path) => {
			console.log("opend:" + path);
			Storage.instance.projectPath = path;
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
			Storage.instance.projectPath = path;
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
		if ((Storage.instance.projectPath = "")) {
			return;
		}
		var path = Storage.instance.projectPath;
		var pathTemp = path + "/" + "temp";
		if (!existsSync(pathTemp)) {
            mkdirSync(pathTemp);
        }
        
        
	}

	public Load() {}

	public Export2Html() {}

	public Export2StormFile() {}
}
