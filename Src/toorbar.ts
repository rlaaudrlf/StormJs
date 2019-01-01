import { Main } from "./main";
import { saveFormat, StyleFormat, StyleFileInfo } from "./Core/SaveFormat";
import { serialize, deserialize } from "./Core/SerializeHelper";
import {
	writeFileSync,
	readFileSync,
	mkdirSync,
	existsSync
} from "fs";
import { Storage } from "./Storage";
import { Container } from "./Editor/Modules/Container";
import { ThemeLoader } from "./editor/ResourceLoader/themeLoader";

const path = require("path");

export class ToolBar {
	public element: HTMLElement;
	private isMouseDown = false;

	public setDiv(element: HTMLElement) {
		this.element = element;

		this.element.onmousedown = () => {
			this.isMouseDown = true;
		};

		this.element.onmouseup = () => {
			this.isMouseDown = false;
		};

		this.element.onmousemove = event => {
			if (this.isMouseDown == true) {
			}
		};

		var button = document.createElement("button");
		button.onclick = () => {
			this.Save();
		};
		button.style.width = "50";
		button.style.height = "30";
		button.textContent = "save";
		this.element.appendChild(button);
		this.element = element;
		var button = document.createElement("button");
		button.onclick = () => {
			this.load();
		};
		button.style.width = "50";
		button.style.height = "30";
		button.textContent = "load";
		this.element.appendChild(button);

		var button = document.createElement("button");
		button.onclick = () => {
			this.load();
		};
		button.style.width = "50";
		button.style.height = "30";
		button.textContent = "export";
		this.element.appendChild(button);

		var button = document.createElement("button");
		button.onclick = () => {
			this.load();
		};
		button.style.width = "50";
		button.style.height = "30";
		button.textContent = "new";
		this.element.appendChild(button);

		var button = document.createElement("button");
		button.onclick = () => {
			const { ipcRenderer } = require("electron");
			ipcRenderer.send("open-file-dialog");
			ipcRenderer.on("selected-directory", (event, path) => {
				console.log(path);
				var pathAssets = path + "/" + "assets";
				if (!existsSync(pathAssets)) {
					mkdirSync(pathAssets);
				}

				var pathConfig = path + "/" + ".stormConfig";

				if (!existsSync(pathConfig)) {
				}

				writeFileSync(pathConfig, "");
				Storage.instance.projectPath = pathAssets;
				Storage.instance.ProjectPath = path;

				console.log(pathAssets);

				Storage.instance.tempPath = path + "/" + "Temp";
				Container.instance.ProjectBuilder.Build(
					Storage.instance.tempPath,
					pathAssets
				);

				var pathBuild = path + "/" + "Build";
				if (!existsSync(pathBuild)) {
					mkdirSync(pathBuild);
				}

				Main.main.panelExplorer.Clear();
				Main.main.panelExplorer.LoadFile();
			});
		};
		button.style.width = "50";
		button.style.height = "30";
		button.textContent = "newP";
		this.element.appendChild(button);

		var button = document.createElement("button");
		button.onclick = () => {
			const { ipcRenderer } = require("electron");
			ipcRenderer.send("window-all-closed");
		};
		button.style.width = "50";
		button.style.height = "30";
		button.style.cssFloat = "right";
		button.textContent = "x";
		this.element.appendChild(button);

		var button = document.createElement("button");
		button.onclick = () => {
			const { ipcRenderer } = require("electron");
			ipcRenderer.send("show-window");
		};
		button.style.width = "50";
		button.style.height = "30";
		button.style.cssFloat = "right";
		button.textContent = "+";
		this.element.appendChild(button);

		var button = document.createElement("button");
		button.onclick = () => {
			const { ipcRenderer } = require("electron");
			ipcRenderer.send("hide-window");
		};
		button.style.width = "50";
		button.style.height = "30";
		button.textContent = "-";
		button.style.cssFloat = "right";
		this.element.appendChild(button);
	}

	public Save() {
		const filePath = path.resolve(process.cwd(), "./test.storm");
		const items = Main.main.panelWorking.workItems;

		let data = "";
		const a = new saveFormat();
		for (const item of items) {
			a.objs.push(item.stormObj);
		}

		data = serialize(a);
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

	public load() {
		const filePath = path.resolve(process.cwd(), "./test.storm");
		const data = readFileSync(filePath, { encoding: "utf-8" });
		const a: saveFormat = deserialize(JSON.parse(data.toString()), saveFormat);
		console.log(a);
		// Main.main.panelWorking.Load(a.objs);
	}
}
