import { readdirSync, lstatSync } from "fs";
import { Storage } from "../../Storage";
import { TreeView } from "../../Components/TreeView";
export class PanelFile {
	element: HTMLElement | null = null;
	treeView:  any= <any>null;
	onItemClick: (data: any) => void = <any>null;
	setDiv(element: HTMLElement | null) {
		if (element == null) {
			return;
		}

		this.element = element;
		element.style.background = "#252526";
		element.style.overflowY = "scroll";
	}

	public Clear() {
		if (this.treeView != null) {
			this.treeView.SetData(null);
		}
	}

	public LoadFile() {
		let paths = [];
		paths.push("assets");
		let id: number = 0;
		let basePath = Storage.instance.ProjectPath + "/";
		let currentPath: string | undefined = paths.pop();
		let currentFileInfo = null;
		let head: FileInfo = <any>null;
		while (currentPath != null) {
			let fileInfo = new FileInfo();
			fileInfo.isDir = true;
			fileInfo.name = currentPath;
			fileInfo.path = basePath + currentPath;
			fileInfo.id = id++;

			if (head == null) {
				head = fileInfo;
			}

			if (currentFileInfo != null) {
				fileInfo.parent = currentFileInfo;
				currentFileInfo.child.push(fileInfo);
			}

			currentFileInfo = fileInfo;

			let path = basePath + currentPath;
			let dirs = readdirSync(path);
			for (const dir of dirs) {
				let stat = lstatSync(path + "/" + dir);
				console.log("/" + dir);
				if (stat.isDirectory() === false) {
					let fileInfo = new FileInfo();
					fileInfo.isDir = false;
					fileInfo.path = path + "/" + dir;
					fileInfo.id = id++;
					fileInfo.name = dir;
					if (currentFileInfo != null) {
						fileInfo.parent = currentFileInfo;
						currentFileInfo.child.push(fileInfo);
					}
				} else {
					let dirPath = dir;

					paths.push(dirPath);
				}
			}

			basePath = basePath + currentPath + "/";
			currentPath = paths.pop();
		}

		this.Render(head);
	}

	public Render(items: FileInfo) {
		let tv = new TreeView<FileInfo>();
		tv.SetDiv(this.element);
		tv.OnSelectStyle = data => {
			return "directory.html";
		};
		tv.FilterItem = data => {
			return data.isDir;
		};
		tv.size = 30;
		let onClick = (
			event: MouseEvent,
			data: any,
			element: HTMLElement,
			state: any
		) => {
			if (data.child == null || data.child == []) {
				return;
			}

			if (state.expanded == true) {
				state.expanded = false;
				(<HTMLElement>state.childElement).style.display = "none";
			} else if (state.expanded == undefined) {
				let tv = new TreeView();
				tv.SetDiv(element);
				tv.OnSelectStyle = data => {
					return "directory.html";
				};
				tv.FilterItem = data => {
					return data.isDir;
				};

				state.expanded = true;
				state.childElement = tv.panel;
				tv.panel.style.paddingLeft = "2%";
				tv.size = 30;
				console.log(data);
				tv.onItemClick = onClick;
				tv.SetData(data.child, FileInfo);
			} else {
				state.expanded = true;
				(<HTMLElement>state.childElement).style.display = "";
			}
			this.onItemClick(data);
		};
		tv.onItemClick = onClick;
		tv.SetData([items], FileInfo);
	}
}

class FileInfo {
	isDir: boolean = false;
	path: string = "";
	name: string = "";
	id: number = 0;
	child: Array<FileInfo> = [];
	parent: FileInfo = <any>null;
}
