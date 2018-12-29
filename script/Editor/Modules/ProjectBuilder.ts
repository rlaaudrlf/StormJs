import { existsSync, mkdirSync, writeFileSync } from "fs";
import { Storage } from "../../Storage";
import { Main } from "../../main";

export class ProjectBuilder {
	pid = -1;
	nodeCmd = require("node-cmd");
	public Build(pathTemp, pathAssets) {
		Storage.instance.tempPath = pathTemp;
		if (!existsSync(pathTemp)) {
			mkdirSync(pathTemp);
		}

		let packag = require("../../Assets/package.txt");
		let webpackConfig = require("../../Assets/webpackConfig.txt");
		let html = require("../../Assets/html.txt");
		// writeFileSync(pathTemp + "/package.json", packag);
		// writeFileSync(pathTemp + "/webpackConfig.js", webpackConfig);
		// writeFileSync(pathTemp + "/index.html", html);
		// writeFileSync(pathTemp + "/index.js", "");

		// this.Kill();

		// var process = this.nodeCmd.run(
		// 	"cd " + pathTemp + "&&yarn install&&npm run watch-poll"
		// );

		// process.stdout.on("data", data => {
		// 	console.log(data);
		// });

		// this.nodeCmd.get(
		// 	"cd " + pathTemp + "&&yarn install&&npm run watch-poll",
		// 	function(err, data, stderr) {
		// 		console.log(data);
		// 	}
		// );

		// this.pid = process.pid;
		// Main.main.panelRuntime.Load();

		// const { ipcRenderer } = require("electron");
		// ipcRenderer.on("refreshBuild", (event, path) => {
		// 	this.Kill();
		// });
		// ipcRenderer.send("ListhenBuildNeedRefresh");
	}

	public Kill() {
		console.log(this.pid);
		if (this.pid != -1) {
			this.nodeCmd.run("taskkill /pid " + this.pid + " -t -f");
		}
	}

	public SetWebPackConfig() {}

	public SetPackage() {}
}
