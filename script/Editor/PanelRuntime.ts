import { Storage } from "../Storage";
export class PanelRuntime {
	element: HTMLElement | null = null;
	SetDiv(element: HTMLElement) {
		this.element = element;
	}

	public Load() {
		let frame = document.createElement("iframe");
		frame.style.width = "100%";
		frame.style.height = "100%";
		frame.setAttribute("src", Storage.instance.tempPath + "/index.html");

		if (this.element == null) {
			return;
		}

		this.element.appendChild(frame);
	}
}
