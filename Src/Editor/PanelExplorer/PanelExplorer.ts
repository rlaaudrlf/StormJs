import { PanelFile } from "./ComponentDirectory";
import { PanelFile2 } from "./ComponentFile";
export class PanelExplorer {
	public panelFile: PanelFile | null = null;
	public panelFile2: PanelFile2 | null = null;

	public start() {
		const file: HTMLElement | null = document.getElementById("File");
		this.panelFile = new PanelFile();
		this.panelFile.setDiv(file);
		this.panelFile2 = new PanelFile2();
		this.panelFile2.SetDivFromID("file2");
		this.panelFile2.start();

		this.panelFile.onItemClick = data => {
			this.panelFile2.setData(data);
		};
	}

	Clear() {
		this.panelFile.Clear();
	}

	LoadFile() {
		this.panelFile.LoadFile();
	}
}
